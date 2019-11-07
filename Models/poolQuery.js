const query = `
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
ALTER TABLE admin_table
  OWNER TO postgres;

CREATE SEQUENCE public.admin_table_admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.admin_table_admin_id_seq OWNED BY public.admin_table.admin_id;


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
);
ALTER TABLE article_comment
  OWNER TO postgres;


CREATE TABLE articles
(
  article_id integer NOT NULL ,
  article_title text NOT NULL,
  article_text text NOT NULL,
  appr_status boolean DEFAULT true,
  employee_id integer,
  creation_date date NOT NULL,
  CONSTRAINT articles_pkey PRIMARY KEY (article_id),
  CONSTRAINT articles_employee_id_fkey FOREIGN KEY (employee_id)
      REFERENCES employees (employee_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE NO ACTION
);
ALTER TABLE articles
  OWNER TO postgres;

CREATE SEQUENCE public.articles_article_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.articles_article_id_seq OWNED BY public.articles.article_id;


CREATE TABLE comments_table
(
  comment_id integer NOT NULL DEFAULT,
  comment_text text NOT NULL,
  employee_id integer,
  creation_date date NOT NULL,
  CONSTRAINT comments_table_pkey PRIMARY KEY (comment_id),
  CONSTRAINT comments_table_employee_id_fkey FOREIGN KEY (employee_id)
      REFERENCES employees (employee_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE NO ACTION
);
ALTER TABLE comments_table
  OWNER TO postgres;

CREATE SEQUENCE public.comments_table_comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.comments_table_comment_id_seq OWNED BY public.comments_table.comment_id;


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
ALTER TABLE employees
  OWNER TO postgres;

CREATE SEQUENCE public.employees_employee_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.employees_employee_id_seq OWNED BY public.employees.employee_id;


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
ALTER TABLE gif_comment
  OWNER TO postgres;


CREATE TABLE gif_table
(
  gif_id integer NOT NULL,
  gif_title text NOT NULL,
  gif_url text NOT NULL,
  appr_status boolean DEFAULT true,
  employee_id integer,
  creation_date date NOT NULL,
  CONSTRAINT gif_table_pkey PRIMARY KEY (gif_id),
  CONSTRAINT gif_table_employee_id_fkey FOREIGN KEY (employee_id)
      REFERENCES employees (employee_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE NO ACTION
);
ALTER TABLE gif_table
  OWNER TO postgres;

CREATE SEQUENCE public.gif_table_gif_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.gif_table_gif_id_seq OWNED BY public.gif_table.gif_id;  RETURNING *`;

module.exports = query;
