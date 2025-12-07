use netcom;

-- Drop tables if they exist.
DROP TABLE IF EXISTS ticket_attachment;
DROP TABLE IF EXISTS timeline;
DROP TABLE IF EXISTS ticket;
DROP TABLE IF EXISTS user_ticket;
DROP TABLE IF EXISTS user_special_field;
DROP TABLE IF EXISTS special_field;
DROP TABLE IF EXISTS sla;
DROP TABLE IF EXISTS ticket_label;
DROP TABLE IF EXISTS priority;
DROP TABLE IF EXISTS status;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS notification;
DROP TABLE IF EXISTS user;

-- Create role table
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

-- Create user table
CREATE TABLE `user` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    last_login_on DATETIME NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    availability ENUM('Available','Busy','Overload','Vacation','MedicalLeave') NOT NULL DEFAULT 'Available',
    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES role(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Create notification table
CREATE TABLE notification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    body TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_read TINYINT(1) NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES `user`(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Create category table
CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

-- Create status table
CREATE TABLE status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

-- Create priority table
CREATE TABLE priority (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB;

-- Create ticket_label table (holds labels for tickets)
CREATE TABLE ticket_label (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT fk_ticket_label_category FOREIGN KEY (category_id) REFERENCES category(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;


-- Create ticket table
CREATE TABLE ticket (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status_id INT NOT NULL,
    category_id INT NOT NULL,
    priority_id INT NOT NULL,
    label_id INT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    notification_status VARCHAR(50) NOT NULL,
    notified_on DATETIME NULL,
    rating INT NOT NULL,
    comment TEXT NULL,
    created_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT fk_ticket_status FOREIGN KEY (status_id) REFERENCES status(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_ticket_category FOREIGN KEY (category_id) REFERENCES category(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_ticket_priority FOREIGN KEY (priority_id) REFERENCES priority(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_ticket_label FOREIGN KEY (label_id) REFERENCES ticket_label(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Create user_ticket table (assignment of tickets to users)
CREATE TABLE user_ticket (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    ticket_id INT NOT NULL,
    assigned_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    assigned_by INT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT fk_user_ticket_user FOREIGN KEY (user_id) REFERENCES `user`(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_user_ticket_ticket FOREIGN KEY (ticket_id) REFERENCES ticket(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_user_ticket_assigned_by FOREIGN KEY (assigned_by) REFERENCES `user`(id)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Create special_field table (custom specialties per category)
CREATE TABLE special_field (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category_id INT NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT fk_special_field_category FOREIGN KEY (category_id) REFERENCES category(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Create user_special_field table (linking users to specialties)
CREATE TABLE user_special_field (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    special_field_id INT NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT fk_user_special_field_user FOREIGN KEY (user_id) REFERENCES `user`(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_user_special_field_special_field FOREIGN KEY (special_field_id) REFERENCES special_field(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Create SLA table (Service Level Agreements per category and priority)
CREATE TABLE sla (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    priority_id INT NOT NULL,
    response_time INT NOT NULL,
    resolution_time INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT fk_sla_category FOREIGN KEY (category_id) REFERENCES category(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_sla_priority FOREIGN KEY (priority_id) REFERENCES priority(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Create timeline table (history of ticket interactions)
CREATE TABLE timeline (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket_id INT NOT NULL,
    user_id INT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT fk_timeline_ticket FOREIGN KEY (ticket_id) REFERENCES ticket(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_timeline_user FOREIGN KEY (user_id) REFERENCES `user`(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Create ticket_attachment table (files attached to timeline entries)
CREATE TABLE ticket_attachment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timeline_id INT NOT NULL,
    file VARCHAR(255) NOT NULL,
    extension VARCHAR(20) NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    CONSTRAINT fk_ticket_attachment_timeline FOREIGN KEY (timeline_id) REFERENCES timeline(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
