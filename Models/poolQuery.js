const query = `
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
ALTER SEQUENCE articles_article_id_seq OWNED BY articles.article_id;

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
ALTER SEQUENCE comments_table_comment_id_seq OWNED BY comments_table.comment_id;

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
ALTER SEQUENCE employees_employee_id_seq OWNED BY employees.employee_id;

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
);

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

module.exports = query;
