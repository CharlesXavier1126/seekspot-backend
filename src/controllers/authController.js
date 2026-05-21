import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import { set as cacheSet, get as cacheGet, del as cacheDel } from '../utils/verificationCache.js';
import { sendVerificationEmail } from '../utils/emailService.js';

const ALLOWED_REGISTER_TYPES = ['individual', 'agent', 'school'];

const generateCode = () => String(Math.floor(100000 + Math.random() * 900000));

export const register = async (req, res) => {
  const { username, email, password, phone_number, user_type } = req.body;

  if (!ALLOWED_REGISTER_TYPES.includes(user_type)) {
    return res.status(400).json({ error: 'INVALID_USER_TYPE' });
  }

  try {
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) return res.status(409).json({ error: 'DUPLICATE_EMAIL' });

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) return res.status(409).json({ error: 'DUPLICATE_USERNAME' });

    const hash = await bcrypt.hash(password, 10);

    if (process.env.NODE_ENV === 'development') {
      await User.create({ username, email, password: hash, phone_number, user_type });
      console.log(`[DEV] User created directly, email verification skipped: ${email}`);
      return res.status(200).json({ status: 'DEV_SKIP_VERIFICATION' });
    }

    const code = generateCode();
    cacheSet(email, { username, email, hashedPassword: hash, phone_number, user_type, code });
    await sendVerificationEmail(email, code);
    res.status(200).json({ status: 'VERIFICATION_REQUIRED' });
  } catch (err) {
    console.error('Register error:', err.name, err.message);
    res.status(400).json({ error: 'Registration failed' });
  }
};

export const verifyAndRegister = async (req, res) => {
  const { email, code } = req.body;
  try {
    const cached = cacheGet(email);
    if (!cached) return res.status(400).json({ error: 'EXPIRED_CODE' });
    if (cached.code !== code) return res.status(400).json({ error: 'INVALID_CODE' });

    const { username, hashedPassword, phone_number, user_type } = cached;
    const user = await User.create({ username, email, password: hashedPassword, phone_number, user_type });

    cacheDel(email);
    res.status(201).json({ message: 'User registered', userId: user.id });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      const field = err.errors[0]?.path;
      if (field === 'username' || field?.endsWith('.username')) return res.status(409).json({ error: 'DUPLICATE_USERNAME' });
      if (field === 'email' || field?.endsWith('.email')) return res.status(409).json({ error: 'DUPLICATE_EMAIL' });
      return res.status(409).json({ error: 'DUPLICATE_USER' });
    }
    console.error('VerifyAndRegister error:', err.name, err.message);
    res.status(400).json({ error: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const isEmail = identifier && identifier.includes('@');
    const user = await User.findOne({
      where: isEmail ? { email: identifier } : { username: identifier }
    });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user.id, userType: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: '25m' }
    );
    res.json({ token, user_type: user.user_type });
  } catch (err) {
    res.status(400).json({ error: 'Login failed' });
  }
};
