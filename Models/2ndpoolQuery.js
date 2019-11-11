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

// queries.one = `INSERT INTO article_comment(article_id, comment_id, employee_id) VALUES (2, 1, 2) RETURNING *`;

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

queries.all = `--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.14
-- Dumped by pg_dump version 9.5.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: admin_table; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_table (
    admin_id integer NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL,
    admin_password text NOT NULL,
    gender text NOT NULL,
    department text NOT NULL,
    jobrole text NOT NULL,
    admin_no integer NOT NULL,
    creation_date date NOT NULL
);


--
-- Name: admin_table_admin_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.admin_table_admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_table_admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.admin_table_admin_id_seq OWNED BY public.admin_table.admin_id;


--
-- Name: article_comment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.article_comment (
    article_id integer NOT NULL,
    comment_id integer NOT NULL,
    employee_id integer NOT NULL
);


--
-- Name: articles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.articles (
    article_id integer NOT NULL,
    article_title text NOT NULL,
    article_text text NOT NULL,
    appr_status boolean DEFAULT true,
    employee_id integer,
    creation_date date NOT NULL
);


--
-- Name: articles_article_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.articles_article_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: articles_article_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.articles_article_id_seq OWNED BY public.articles.article_id;


--
-- Name: comments_table; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments_table (
    comment_id integer NOT NULL,
    comment_text text NOT NULL,
    employee_id integer,
    creation_date date NOT NULL
);


--
-- Name: comments_table_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_table_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_table_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_table_comment_id_seq OWNED BY public.comments_table.comment_id;


--
-- Name: employees; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.employees (
    employee_id integer NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL,
    employee_password text NOT NULL,
    gender text NOT NULL,
    jobrole text NOT NULL,
    employee_no integer NOT NULL,
    department text NOT NULL,
    creation_date date NOT NULL
);


--
-- Name: employees_employee_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.employees_employee_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: employees_employee_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.employees_employee_id_seq OWNED BY public.employees.employee_id;


--
-- Name: gif_comment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.gif_comment (
    gif_id integer NOT NULL,
    comment_id integer NOT NULL,
    employee_id integer NOT NULL
);


--
-- Name: gif_table; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.gif_table (
    gif_id integer NOT NULL,
    gif_title text NOT NULL,
    gif_url text NOT NULL,
    appr_status boolean DEFAULT true,
    employee_id integer,
    creation_date date NOT NULL,
    gif_public_id text
);


--
-- Name: gif_table_gif_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.gif_table_gif_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: gif_table_gif_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.gif_table_gif_id_seq OWNED BY public.gif_table.gif_id;


--
-- Name: admin_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_table ALTER COLUMN admin_id SET DEFAULT nextval('public.admin_table_admin_id_seq'::regclass);


--
-- Name: article_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles ALTER COLUMN article_id SET DEFAULT nextval('public.articles_article_id_seq'::regclass);


--
-- Name: comment_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments_table ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_table_comment_id_seq'::regclass);


--
-- Name: employee_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employees ALTER COLUMN employee_id SET DEFAULT nextval('public.employees_employee_id_seq'::regclass);


--
-- Name: gif_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gif_table ALTER COLUMN gif_id SET DEFAULT nextval('public.gif_table_gif_id_seq'::regclass);


--
-- Data for Name: admin_table; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: admin_table_admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.admin_table_admin_id_seq', 1, false);


--
-- Data for Name: article_comment; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.article_comment (article_id, comment_id, employee_id) VALUES (2, 1, 2);
INSERT INTO public.article_comment (article_id, comment_id, employee_id) VALUES (2, 2, 3);
INSERT INTO public.article_comment (article_id, comment_id, employee_id) VALUES (2, 3, 2);
INSERT INTO public.article_comment (article_id, comment_id, employee_id) VALUES (3, 4, 2);
INSERT INTO public.article_comment (article_id, comment_id, employee_id) VALUES (3, 5, 2);
INSERT INTO public.article_comment (article_id, comment_id, employee_id) VALUES (3, 6, 2);
INSERT INTO public.article_comment (article_id, comment_id, employee_id) VALUES (3, 7, 2);
INSERT INTO public.article_comment (article_id, comment_id, employee_id) VALUES (3, 8, 2);
INSERT INTO public.article_comment (article_id, comment_id, employee_id) VALUES (1, 9, 2);


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (1, 'my first article', 'this is the first article i would be posting', NULL, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (3, 'my first article', 'this is the first article i would be posting', false, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (6, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (7, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (8, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (9, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (10, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (11, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (12, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (13, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (14, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (15, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (16, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (17, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (18, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (19, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (20, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (21, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (22, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (23, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (24, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (25, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (26, 'my test article', 'this is a test article creation', false, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (27, 'my test article', 'this is a test article creation', false, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (28, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (29, 'my test article', 'this is a test article creation', false, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (30, 'test article', 'this is a test article', true, 2, '2019-11-06');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (116, 'test article', 'this is a test article', true, 2, '2019-11-07');
INSERT INTO public.articles (article_id, article_title, article_text, appr_status, employee_id, creation_date) VALUES (2, 'the changed article title', 'the changed article text', false, 2, '2019-11-06');


--
-- Name: articles_article_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.articles_article_id_seq', 116, true);


--
-- Data for Name: comments_table; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.comments_table (comment_id, comment_text, employee_id, creation_date) VALUES (1, 'this is  a new comment', 2, '2019-10-10');
INSERT INTO public.comments_table (comment_id, comment_text, employee_id, creation_date) VALUES (2, 'this is a comment by another employee', 3, '2019-10-09');
INSERT INTO public.comments_table (comment_id, comment_text, employee_id, creation_date) VALUES (3, 'postman sent this comment to the server', 2, '2019-11-10');
INSERT INTO public.comments_table (comment_id, comment_text, employee_id, creation_date) VALUES (4, 'postman sent this comment to the server', 2, '2019-11-10');
INSERT INTO public.comments_table (comment_id, comment_text, employee_id, creation_date) VALUES (5, 'postman sent this comment to the server', 2, '2019-11-10');
INSERT INTO public.comments_table (comment_id, comment_text, employee_id, creation_date) VALUES (6, 'postman sent this comment to the server', 2, '2019-11-10');
INSERT INTO public.comments_table (comment_id, comment_text, employee_id, creation_date) VALUES (7, 'postman sent this comment to the server', 2, '2019-11-10');
INSERT INTO public.comments_table (comment_id, comment_text, employee_id, creation_date) VALUES (8, 'postman sent this comment to the server', 2, '2019-11-10');
INSERT INTO public.comments_table (comment_id, comment_text, employee_id, creation_date) VALUES (9, 'postman sent this comment to the server', 2, '2019-11-10');
INSERT INTO public.comments_table (comment_id, comment_text, employee_id, creation_date) VALUES (10, 'postman sent this comment to the server', 2, '2019-11-10');
INSERT INTO public.comments_table (comment_id, comment_text, employee_id, creation_date) VALUES (11, 'postman sent this comment to the server', 2, '2019-11-10');
INSERT INTO public.comments_table (comment_id, comment_text, employee_id, creation_date) VALUES (12, 'postman sent this comment to the server', 2, '2019-11-10');
INSERT INTO public.comments_table (comment_id, comment_text, employee_id, creation_date) VALUES (13, 'postman sent this gif comment to the server', 2, '2019-11-10');
INSERT INTO public.comments_table (comment_id, comment_text, employee_id, creation_date) VALUES (14, ' another  gif comment to the server', 2, '2019-11-10');


--
-- Name: comments_table_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_table_comment_id_seq', 14, true);


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.employees (employee_id, firstname, lastname, email, employee_password, gender, jobrole, employee_no, department, creation_date) VALUES (2, 'oluwatosin', 'fetuga', 'gnztrade@gmail.com', '$2b$09$A/.FH2Qm/3BE/C7GaxsMW.Gd23fsfDVJRXblSjIR26uJGRh/utqsi', 'male', 'Full Stack', 902307, 'I.T', '2019-06-10');
INSERT INTO public.employees (employee_id, firstname, lastname, email, employee_password, gender, jobrole, employee_no, department, creation_date) VALUES (3, 'wumi', 'fetuga', 'kolawolehorlawummy@gmail.com', '$2b$09$XqYIHsT3xcgMF8KDIfjBiuM5dzCjcgIle9OtPEDKNzKcs4z.q3wxC', 'female', 'FRONT END', 902308, 'I.T', '2019-11-06');
INSERT INTO public.employees (employee_id, firstname, lastname, email, employee_password, gender, jobrole, employee_no, department, creation_date) VALUES (4, 'wumiwumi', 'fetuga', 'wumiwumi@gmail.com', '$2b$09$WDQ4gWxFBTQBICvUL.UyFOmMEeHGEs0BiI0V/igxzxRLDGoomMQeq', 'female', 'FRONT END', 902310, 'I.T', '2019-11-06');


--
-- Name: employees_employee_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.employees_employee_id_seq', 28, true);


--
-- Data for Name: gif_comment; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.gif_comment (gif_id, comment_id, employee_id) VALUES (7, 13, 2);
INSERT INTO public.gif_comment (gif_id, comment_id, employee_id) VALUES (7, 14, 2);


--
-- Data for Name: gif_table; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (7, 'my first gif test', 'https://res.cloudinary.com/tos4christ/image/upload/v1573236276/up6t50h5vdoipqpj0gll.jpg', false, 2, '2019-11-07', 'up6t50h5vdoipqpj0gll');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (9, 'my first gif test', 'https://res.cloudinary.com/tos4christ/image/upload/v1573235762/joo8zm36uc1od5e4fg0k.jpg', false, 2, '2019-11-07', 'joo8zm36uc1od5e4fg0k');


--
-- Name: gif_table_gif_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gif_table_gif_id_seq', 9, true);


--
-- Name: admin_table_admin_no_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_table
    ADD CONSTRAINT admin_table_admin_no_key UNIQUE (admin_no);


--
-- Name: admin_table_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_table
    ADD CONSTRAINT admin_table_email_key UNIQUE (email);


--
-- Name: admin_table_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_table
    ADD CONSTRAINT admin_table_pkey PRIMARY KEY (admin_id);


--
-- Name: article_comment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_comment
    ADD CONSTRAINT article_comment_pkey PRIMARY KEY (article_id, comment_id, employee_id);


--
-- Name: articles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (article_id);


--
-- Name: comments_table_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments_table
    ADD CONSTRAINT comments_table_pkey PRIMARY KEY (comment_id);


--
-- Name: employees_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_email_key UNIQUE (email);


--
-- Name: employees_employee_no_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_employee_no_key UNIQUE (employee_no);


--
-- Name: employees_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT employees_pkey PRIMARY KEY (employee_id);


--
-- Name: gif_comment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gif_comment
    ADD CONSTRAINT gif_comment_pkey PRIMARY KEY (gif_id, comment_id, employee_id);


--
-- Name: gif_table_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gif_table
    ADD CONSTRAINT gif_table_pkey PRIMARY KEY (gif_id);


--
-- Name: article_comment_article_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_comment
    ADD CONSTRAINT article_comment_article_id_fkey FOREIGN KEY (article_id) REFERENCES public.articles(article_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: article_comment_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_comment
    ADD CONSTRAINT article_comment_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments_table(comment_id) ON UPDATE CASCADE;


--
-- Name: article_comment_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_comment
    ADD CONSTRAINT article_comment_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id) ON UPDATE CASCADE;


--
-- Name: articles_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id) ON UPDATE CASCADE;


--
-- Name: comments_table_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments_table
    ADD CONSTRAINT comments_table_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id) ON UPDATE CASCADE;


--
-- Name: gif_comment_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gif_comment
    ADD CONSTRAINT gif_comment_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments_table(comment_id) ON UPDATE CASCADE;


--
-- Name: gif_comment_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gif_comment
    ADD CONSTRAINT gif_comment_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id) ON UPDATE CASCADE;


--
-- Name: gif_comment_gif_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gif_comment
    ADD CONSTRAINT gif_comment_gif_id_fkey FOREIGN KEY (gif_id) REFERENCES public.gif_table(gif_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: gif_table_employee_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gif_table
    ADD CONSTRAINT gif_table_employee_id_fkey FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id) ON UPDATE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

`

module.exports = queries;
