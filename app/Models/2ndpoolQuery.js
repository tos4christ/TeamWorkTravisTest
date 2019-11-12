const queries = {};

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
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (42, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573540784/mqkdwnuttmvpyc7vqpho.jpg', false, 2, '2019-11-12', 'mqkdwnuttmvpyc7vqpho');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (43, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573541007/zcpf9kpnvlvnhguo65im.jpg', false, 2, '2019-11-12', 'zcpf9kpnvlvnhguo65im');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (44, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573541066/bfr59iizlyhosiin0b8e.jpg', false, 2, '2019-11-12', 'bfr59iizlyhosiin0b8e');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (45, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573548646/p7mo6hfqcadqu1y58p8p.jpg', false, 2, '2019-11-12', 'p7mo6hfqcadqu1y58p8p');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (46, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573548739/mitifjqfdxis3ndyo5nx.jpg', false, 2, '2019-11-12', 'mitifjqfdxis3ndyo5nx');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (47, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573548858/ghjv7fctqufaibefbavl.jpg', false, 2, '2019-11-12', 'ghjv7fctqufaibefbavl');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (48, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573548905/qrbympyxvlqfa6ux8esn.jpg', false, 2, '2019-11-12', 'qrbympyxvlqfa6ux8esn');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (9, 'my first gif test', 'https://res.cloudinary.com/tos4christ/image/upload/v1573235762/joo8zm36uc1od5e4fg0k.jpg', false, 2, '2019-11-07', 'joo8zm36uc1od5e4fg0k');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (19, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573464829/vayqtruz8xig1p0gcxvv.jpg', false, 2, '2019-11-11', 'vayqtruz8xig1p0gcxvv');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (20, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573464945/k0zdsrfrm5xeklwqzbnc.jpg', false, 2, '2019-11-11', 'k0zdsrfrm5xeklwqzbnc');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (21, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573464991/lpnfyidwnkym5ipvdh6a.jpg', false, 2, '2019-11-11', 'lpnfyidwnkym5ipvdh6a');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (22, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573465023/nijoyrd4whvptjyjzg9o.jpg', false, 2, '2019-11-11', 'nijoyrd4whvptjyjzg9o');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (23, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573465123/ajii2elnk3zko4kdmo3m.jpg', false, 2, '2019-11-11', 'ajii2elnk3zko4kdmo3m');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (24, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573465180/ikhk18jppulmpzbsff6c.jpg', false, 2, '2019-11-11', 'ikhk18jppulmpzbsff6c');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (27, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573465369/gviwlzlbbip67mgpzroo.jpg', false, 2, '2019-11-11', 'gviwlzlbbip67mgpzroo');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (36, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573539152/eqy5wo4c2ksf34k1sepd.jpg', false, 2, '2019-11-12', 'eqy5wo4c2ksf34k1sepd');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (37, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573539547/btu4lwycpzjefmrdux03.jpg', false, 2, '2019-11-12', 'btu4lwycpzjefmrdux03');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (38, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573539888/hj7m3xmd79vtap29iqaj.jpg', false, 2, '2019-11-12', 'hj7m3xmd79vtap29iqaj');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (39, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573540071/y3mtrfod6pyjk1dzp79d.jpg', false, 2, '2019-11-12', 'y3mtrfod6pyjk1dzp79d');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (40, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573540112/htf9swyswusbbm24hylb.jpg', false, 2, '2019-11-12', 'htf9swyswusbbm24hylb');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (41, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573540178/tgybtwfh32ijqhht3cxm.jpg', false, 2, '2019-11-12', 'tgybtwfh32ijqhht3cxm');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (49, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573548947/pymo01b0qehntaik8df5.jpg', false, 2, '2019-11-12', 'pymo01b0qehntaik8df5');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (50, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573549004/itizgecbz6wkifcvmrxp.jpg', false, 2, '2019-11-12', 'itizgecbz6wkifcvmrxp');
INSERT INTO public.gif_table (gif_id, gif_title, gif_url, appr_status, employee_id, creation_date, gif_public_id) VALUES (51, 'my first gif test', 'http://res.cloudinary.com/tos4christ/image/upload/v1573549070/ldhbisbqnkjtnxcq3ama.jpg', false, 2, '2019-11-12', 'ldhbisbqnkjtnxcq3ama');


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

export default queries;
