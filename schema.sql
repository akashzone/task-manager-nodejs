
use todo_data;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERT INTO tasks(title) value("Eat"),("Code");

