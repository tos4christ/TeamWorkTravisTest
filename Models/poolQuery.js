const queries = {};

queries.admin_table_query = `

CREATE TABLE admin_table
(
  admin_id integer NOT NULL,
  firstname text NOT NULL,
  lastname text NOT NULL,
  email text NOT NULL,
  admin_password text NOT NULL,
  gender text NOT NULL,
  department text NOT NULL,
  jobrole text NOT NULL,
  admin_no integer NOT NULL,
  creation_date date NOT NULL,
  CONSTRAINT admin_table_pkey PRIMARY KEY (admin_id),
  CONSTRAINT admin_table_admin_no_key UNIQUE (admin_no),
  CONSTRAINT admin_table_email_key UNIQUE (email)
);
CREATE SEQUENCE admin_table_admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE admin_table_admin_id_seq OWNED BY admin_table.admin_id;`

queries.article_comment_query = `
CREATE TABLE article_comment
(
  article_id integer NOT NULL,
  comment_id integer NOT NULL,
  employee_id integer NOT NULL,
  CONSTRAINT article_comment_pkey PRIMARY KEY (article_id, comment_id, employee_id),
  CONSTRAINT article_comment_article_id_fkey FOREIGN KEY (article_id)
      REFERENCES articles (article_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE NO ACTION,
  CONSTRAINT article_comment_comment_id_fkey FOREIGN KEY (comment_id)
      REFERENCES comments_table (comment_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE NO ACTION,
  CONSTRAINT article_comment_employee_id_fkey FOREIGN KEY (employee_id)
      REFERENCES employees (employee_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE NO ACTION
);`

queries.articles_query = `
CREATE TABLE articles( article_id integer NOT NULL,
  article_title text NOT NULL,
  article_text text NOT NULL,
  appr_status boolean,
  employee_id integer,
  creation_date date NOT NULL,
  CONSTRAINT articles_pkey PRIMARY KEY (article_id),
  CONSTRAINT articles_employee_id_fkey FOREIGN KEY (employee_id)
      REFERENCES employees (employee_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE NO ACTION);
CREATE SEQUENCE articles_article_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE articles_article_id_seq OWNED BY articles.article_id; `

queries.comments_table_query = `
CREATE TABLE comments_table
(
  comment_id integer NOT NULL,
  comment_text text NOT NULL,
  employee_id integer,
  creation_date date NOT NULL,
  CONSTRAINT comments_table_pkey PRIMARY KEY (comment_id),
  CONSTRAINT comments_table_employee_id_fkey FOREIGN KEY (employee_id)
      REFERENCES employees (employee_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE NO ACTION
);
CREATE SEQUENCE comments_table_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE comments_table_comment_id_seq OWNED BY comments_table.comment_id; `

queries.employees_query = `
CREATE TABLE employees
(
  employee_id integer NOT NULL,
  firstname text NOT NULL,
  lastname text NOT NULL,
  email text NOT NULL,
  employee_password text NOT NULL,
  gender text NOT NULL,
  jobrole text NOT NULL,
  employee_no integer NOT NULL,
  department text NOT NULL,
  creation_date date NOT NULL,
  CONSTRAINT employees_pkey PRIMARY KEY (employee_id),
  CONSTRAINT employees_email_key UNIQUE (email),
  CONSTRAINT employees_employee_no_key UNIQUE (employee_no)
);
CREATE SEQUENCE employees_employee_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE employees_employee_id_seq OWNED BY employees.employee_id; `

queries.gif_comment_query = `
CREATE TABLE gif_comment
(
  gif_id integer NOT NULL,
  comment_id integer NOT NULL,
  employee_id integer NOT NULL,
  CONSTRAINT gif_comment_pkey PRIMARY KEY (gif_id, comment_id, employee_id),
  CONSTRAINT gif_comment_comment_id_fkey FOREIGN KEY (comment_id)
      REFERENCES comments_table (comment_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE NO ACTION,
  CONSTRAINT gif_comment_employee_id_fkey FOREIGN KEY (employee_id)
      REFERENCES employees (employee_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE NO ACTION,
  CONSTRAINT gif_comment_gif_id_fkey FOREIGN KEY (gif_id)
      REFERENCES gif_table (gif_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE NO ACTION
); `

queries.gif_table_query = `
CREATE TABLE gif_table
(
  gif_id integer NOT NULL,
  gif_title text NOT NULL,
  gif_url text NOT NULL,
  appr_status boolean,
  employee_id integer,
  creation_date date NOT NULL,
  CONSTRAINT gif_table_pkey PRIMARY KEY (gif_id),
  CONSTRAINT gif_table_employee_id_fkey FOREIGN KEY (employee_id)
      REFERENCES employees (employee_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE NO ACTION
);
CREATE SEQUENCE gif_table_gif_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE gif_table_gif_id_seq OWNED BY gif_table.gif_id;`;

queries.one = `INSERT INTO article_comment(article_id, comment_id, employee_id) VALUES (2, 1, 2) RETURNING *`;

queries.insertValue = `
INSERT INTO employees (employee_id, firstname, lastname, email, employee_password, gender, jobrole, employee_no, department, creation_date) VALUES (2, 'oluwatosin', 'fetuga', 'gnztrade@gmail.com', '$2b$09$A/.FH2Qm/3BE/C7GaxsMW.Gd23fsfDVJRXblSjIR26uJGRh/utqsi', 'male', 'Full Stack', 902307, 'I.T', '2019-06-10');
INSERT INTO employees (employee_id, firstname, lastname, email, employee_password, gender, jobrole, employee_no, department, creation_date) VALUES (3, 'wumi', 'fetuga', 'kolawolehorlawummy@gmail.com', '$2b$09$XqYIHsT3xcgMF8KDIfjBiuM5dzCjcgIle9OtPEDKNzKcs4z.q3wxC', 'female', 'FRONT END', 902308, 'I.T', '2019-11-06');
INSERT INTO employees (employee_id, firstname, lastname, email, employee_password, gender, jobrole, employee_no, department, creation_date) VALUES (4, 'wumiwumi', 'fetuga', 'wumiwumi@gmail.com', '$2b$09$WDQ4gWxFBTQBICvUL.UyFOmMEeHGEs0BiI0V/igxzxRLDGoomMQeq', 'female', 'FRONT END', 902310, 'I.T', '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (1, 'my first article', 'this is the first article i would be posting', NULL, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (2, 'my first article', 'this is the first article i would be posting', false, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (3, 'my first article', 'this is the first article i would be posting', false, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (4, 'my first test article', 'this is the first article i would be posting to test', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (5, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (6, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (7, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (8, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (9, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (10, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (11, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (12, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (13, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (14, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (15, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (16, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (17, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (18, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (19, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (20, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (21, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (22, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (23, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (24, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (25, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (26, 'my test article', 'this is a test article creation', false, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (27, 'my test article', 'this is a test article creation', false, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (28, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (29, 'my test article', 'this is a test article creation', false, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (30, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (31, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (32, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (33, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (34, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (35, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (36, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (37, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (38, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (39, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (40, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (41, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (42, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (43, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (44, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (45, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (46, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (47, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (48, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (49, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (50, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (51, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (52, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (53, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (54, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (55, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (56, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (57, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (58, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (59, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (60, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (61, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (62, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (63, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (64, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (65, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (66, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (67, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (68, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (69, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (70, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (71, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (72, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (73, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (74, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (75, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (76, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (77, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (78, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (79, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (80, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (81, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (82, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (83, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (84, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (85, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (86, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (87, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (88, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (89, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (90, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (91, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (92, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (93, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (94, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (95, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (96, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (97, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (98, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (99, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (100, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (101, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (102, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (103, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (104, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (105, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (106, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (107, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (108, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (109, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (110, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (111, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (112, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (113, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (114, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (115, 'my test article', 'this is a test article creation', false, 2, '2019-11-07');
INSERT INTO articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (116, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date) VALUES (3, 'my first gif post', 'http://res.cloudinary.com/tos4christ/image/upload/v1573106836/b2jjxbfirtvi3dwsxfjk.jpg', NULL, 2, '2019-11-07');
INSERT INTO gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date) VALUES (6, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573112906/yfikhwu3lxgpksoecrb7.jpg', false, 2, '2019-11-07');
INSERT INTO gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date) VALUES (7, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573112940/zsqsrgs7exc4riinh26r.jpg', false, 2, '2019-11-07');
INSERT INTO gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date) VALUES (8, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573113815/ird7l8r1mgwzcwoxpulq.jpg', false, 2, '2019-11-07');
INSERT INTO gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date) VALUES (9, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573113909/ytyyuoonc3oqoorczhgm.jpg', false, 2, '2019-11-07');
INSERT INTO comments_table (comment_id, comment_text, employee_id, creation_date) VALUES (1, 'this is  a new comment', 2, '2019-10-10');
INSERT INTO comments_table (comment_id, comment_text, employee_id, creation_date) VALUES (2, 'this is a comment by another employee', 3, '2019-10-09');
INSERT INTO article_comment (article_id, comment_id, employee_id) VALUES (2, 1, 2);
INSERT INTO article_comment (article_id, comment_id, employee_id) VALUES (2, 2, 3);
`
module.exports = queries;
