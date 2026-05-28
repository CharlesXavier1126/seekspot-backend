USE seekspotdb;

-- All passwords: scsgdtcy3 (bcrypt, cost 10)
INSERT IGNORE INTO users (username, email, password, user_type) VALUES
  ('individual_user',   'individual@test.local',  '$2b$10$fYQIoQuaULovkbifI8FXB.5kt2FRucthNC0UZleLu41mJtiNoG3Ry', 'individual'),
  ('agent_user',        'agent@test.local',       '$2b$10$fYQIoQuaULovkbifI8FXB.5kt2FRucthNC0UZleLu41mJtiNoG3Ry', 'agent'),
  ('administrator',     'admin@test.local',       '$2b$10$fYQIoQuaULovkbifI8FXB.5kt2FRucthNC0UZleLu41mJtiNoG3Ry', 'administrator'),
  ('school_recruiter',  'recruiter@test.local',   '$2b$10$fYQIoQuaULovkbifI8FXB.5kt2FRucthNC0UZleLu41mJtiNoG3Ry', 'school-recruiter'),
  ('school_accountant', 'accountant@test.local',  '$2b$10$fYQIoQuaULovkbifI8FXB.5kt2FRucthNC0UZleLu41mJtiNoG3Ry', 'school-accountant'),
  ('school_admin',      'schooladmin@test.local', '$2b$10$fYQIoQuaULovkbifI8FXB.5kt2FRucthNC0UZleLu41mJtiNoG3Ry', 'school-admin');
