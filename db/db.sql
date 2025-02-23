PGDMP     4                    {            bootcamp    14.4    14.4 P    g           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            h           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            i           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            j           1262    114703    bootcamp    DATABASE     m   CREATE DATABASE bootcamp WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United Kingdom.1252';
    DROP DATABASE bootcamp;
                postgres    false                        2615    2200    bootcamp    SCHEMA        CREATE SCHEMA bootcamp;
    DROP SCHEMA bootcamp;
                postgres    false            k           0    0    SCHEMA bootcamp    COMMENT     8   COMMENT ON SCHEMA bootcamp IS 'standard public schema';
                   postgres    false    3                        2615    114704    sepgit    SCHEMA        CREATE SCHEMA sepgit;
    DROP SCHEMA sepgit;
                postgres    false            �            1259    114779    course    TABLE     �  CREATE TABLE bootcamp.course (
    id bigint NOT NULL,
    name_tm text,
    name_en text,
    name_ru text,
    short_desc_tm text,
    short_desc_ru text,
    short_desc_en text,
    highlight_tm text,
    highlight_ru text,
    highlight_en text,
    desc_tm text,
    desc_ru text,
    desc_en text,
    price text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    image text
);
    DROP TABLE bootcamp.course;
       bootcamp         heap    postgres    false    3            �            1259    114778    course_id_seq    SEQUENCE     x   CREATE SEQUENCE bootcamp.course_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE bootcamp.course_id_seq;
       bootcamp          postgres    false    3    219            l           0    0    course_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE bootcamp.course_id_seq OWNED BY bootcamp.course.id;
          bootcamp          postgres    false    218            �            1259    114790    course_item    TABLE     �  CREATE TABLE bootcamp.course_item (
    id bigint NOT NULL,
    name_tm text,
    name_ru text,
    name_en text,
    desc_tm text,
    desc_ru text,
    desc_en text,
    icon text,
    item_type text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    "position" bigint DEFAULT 0,
    course_id bigint NOT NULL
);
 !   DROP TABLE bootcamp.course_item;
       bootcamp         heap    postgres    false    3            �            1259    114789    course_item_id_seq    SEQUENCE     }   CREATE SEQUENCE bootcamp.course_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE bootcamp.course_item_id_seq;
       bootcamp          postgres    false    3    221            m           0    0    course_item_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE bootcamp.course_item_id_seq OWNED BY bootcamp.course_item.id;
          bootcamp          postgres    false    220            �            1259    114820    enroll    TABLE     V  CREATE TABLE bootcamp.enroll (
    id bigint NOT NULL,
    fullname text,
    email text,
    phone_number text,
    languages text,
    find_us text,
    course_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    user_id bigint DEFAULT '-1'::integer
);
    DROP TABLE bootcamp.enroll;
       bootcamp         heap    postgres    false    3            �            1259    114819    enroll_id_seq    SEQUENCE     x   CREATE SEQUENCE bootcamp.enroll_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE bootcamp.enroll_id_seq;
       bootcamp          postgres    false    3    225            n           0    0    enroll_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE bootcamp.enroll_id_seq OWNED BY bootcamp.enroll.id;
          bootcamp          postgres    false    224            �            1259    114807    review    TABLE     ^  CREATE TABLE bootcamp.review (
    id bigint NOT NULL,
    fullname text,
    email text,
    phone_number text,
    message text,
    course_id bigint DEFAULT '-1'::integer,
    is_active boolean DEFAULT false,
    user_id bigint,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE bootcamp.review;
       bootcamp         heap    postgres    false    3            �            1259    114806    review_id_seq    SEQUENCE     x   CREATE SEQUENCE bootcamp.review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE bootcamp.review_id_seq;
       bootcamp          postgres    false    3    223            o           0    0    review_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE bootcamp.review_id_seq OWNED BY bootcamp.review.id;
          bootcamp          postgres    false    222            �            1259    114766    users    TABLE     G  CREATE TABLE bootcamp.users (
    id bigint NOT NULL,
    fullname text,
    username text,
    password text,
    phone_number text,
    address text,
    image text,
    user_type text,
    permission text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE bootcamp.users;
       bootcamp         heap    postgres    false    3            �            1259    114765    users_id_seq    SEQUENCE     w   CREATE SEQUENCE bootcamp.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE bootcamp.users_id_seq;
       bootcamp          postgres    false    217    3            p           0    0    users_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE bootcamp.users_id_seq OWNED BY bootcamp.users.id;
          bootcamp          postgres    false    216            �            1259    114837    video_course    TABLE     2  CREATE TABLE bootcamp.video_course (
    id bigint NOT NULL,
    title_tm text,
    title_ru text,
    title_en text,
    image text,
    desc_tm text,
    desc_en text,
    desc_ru text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
 "   DROP TABLE bootcamp.video_course;
       bootcamp         heap    postgres    false    3            �            1259    114836    video_course_id_seq    SEQUENCE     ~   CREATE SEQUENCE bootcamp.video_course_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE bootcamp.video_course_id_seq;
       bootcamp          postgres    false    3    227            q           0    0    video_course_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE bootcamp.video_course_id_seq OWNED BY bootcamp.video_course.id;
          bootcamp          postgres    false    226            �            1259    114849 
   video_item    TABLE     �  CREATE TABLE bootcamp.video_item (
    id bigint NOT NULL,
    title_tm text,
    title_ru text,
    title_en text,
    creator text,
    video_url text,
    desc_tm text,
    desc_ru text,
    desc_en text,
    sources text,
    views bigint DEFAULT 0,
    video_course_id bigint NOT NULL,
    "position" bigint DEFAULT 0,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
     DROP TABLE bootcamp.video_item;
       bootcamp         heap    postgres    false    3            �            1259    114848    video_item_id_seq    SEQUENCE     |   CREATE SEQUENCE bootcamp.video_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE bootcamp.video_item_id_seq;
       bootcamp          postgres    false    229    3            r           0    0    video_item_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE bootcamp.video_item_id_seq OWNED BY bootcamp.video_item.id;
          bootcamp          postgres    false    228            �            1259    114748    bilboard    TABLE     F  CREATE TABLE sepgit.bilboard (
    id bigint NOT NULL,
    image_tm text,
    image_en text,
    image_ru text,
    content_tm text,
    content_ru text,
    content_en text,
    "position" bigint DEFAULT 0,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE sepgit.bilboard;
       sepgit         heap    postgres    false    4            �            1259    114747    bilboard_id_seq    SEQUENCE     x   CREATE SEQUENCE sepgit.bilboard_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE sepgit.bilboard_id_seq;
       sepgit          postgres    false    4    215            s           0    0    bilboard_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE sepgit.bilboard_id_seq OWNED BY sepgit.bilboard.id;
          sepgit          postgres    false    214            �            1259    114717    media    TABLE     k  CREATE TABLE sepgit.media (
    id bigint NOT NULL,
    name text,
    surname text,
    job text,
    image text,
    topic_tm text,
    topic_en text,
    topic_ru text,
    language text,
    file_name text,
    type text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    duration text
);
    DROP TABLE sepgit.media;
       sepgit         heap    postgres    false    4            �            1259    114716    media_id_seq    SEQUENCE     u   CREATE SEQUENCE sepgit.media_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE sepgit.media_id_seq;
       sepgit          postgres    false    4    213            t           0    0    media_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE sepgit.media_id_seq OWNED BY sepgit.media.id;
          sepgit          postgres    false    212            �            1259    114706    story    TABLE       CREATE TABLE sepgit.story (
    id bigint NOT NULL,
    fullname text,
    organzation text,
    image text,
    text_tm text,
    text_ru text,
    text_en text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE sepgit.story;
       sepgit         heap    postgres    false    4            �            1259    114705    story_id_seq    SEQUENCE     u   CREATE SEQUENCE sepgit.story_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE sepgit.story_id_seq;
       sepgit          postgres    false    211    4            u           0    0    story_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE sepgit.story_id_seq OWNED BY sepgit.story.id;
          sepgit          postgres    false    210            �           2604    114782 	   course id    DEFAULT     j   ALTER TABLE ONLY bootcamp.course ALTER COLUMN id SET DEFAULT nextval('bootcamp.course_id_seq'::regclass);
 :   ALTER TABLE bootcamp.course ALTER COLUMN id DROP DEFAULT;
       bootcamp          postgres    false    219    218    219            �           2604    114793    course_item id    DEFAULT     t   ALTER TABLE ONLY bootcamp.course_item ALTER COLUMN id SET DEFAULT nextval('bootcamp.course_item_id_seq'::regclass);
 ?   ALTER TABLE bootcamp.course_item ALTER COLUMN id DROP DEFAULT;
       bootcamp          postgres    false    220    221    221            �           2604    114823 	   enroll id    DEFAULT     j   ALTER TABLE ONLY bootcamp.enroll ALTER COLUMN id SET DEFAULT nextval('bootcamp.enroll_id_seq'::regclass);
 :   ALTER TABLE bootcamp.enroll ALTER COLUMN id DROP DEFAULT;
       bootcamp          postgres    false    225    224    225            �           2604    114810 	   review id    DEFAULT     j   ALTER TABLE ONLY bootcamp.review ALTER COLUMN id SET DEFAULT nextval('bootcamp.review_id_seq'::regclass);
 :   ALTER TABLE bootcamp.review ALTER COLUMN id DROP DEFAULT;
       bootcamp          postgres    false    222    223    223            �           2604    114769    users id    DEFAULT     h   ALTER TABLE ONLY bootcamp.users ALTER COLUMN id SET DEFAULT nextval('bootcamp.users_id_seq'::regclass);
 9   ALTER TABLE bootcamp.users ALTER COLUMN id DROP DEFAULT;
       bootcamp          postgres    false    217    216    217            �           2604    114840    video_course id    DEFAULT     v   ALTER TABLE ONLY bootcamp.video_course ALTER COLUMN id SET DEFAULT nextval('bootcamp.video_course_id_seq'::regclass);
 @   ALTER TABLE bootcamp.video_course ALTER COLUMN id DROP DEFAULT;
       bootcamp          postgres    false    227    226    227            �           2604    114852    video_item id    DEFAULT     r   ALTER TABLE ONLY bootcamp.video_item ALTER COLUMN id SET DEFAULT nextval('bootcamp.video_item_id_seq'::regclass);
 >   ALTER TABLE bootcamp.video_item ALTER COLUMN id DROP DEFAULT;
       bootcamp          postgres    false    228    229    229            �           2604    114751    bilboard id    DEFAULT     j   ALTER TABLE ONLY sepgit.bilboard ALTER COLUMN id SET DEFAULT nextval('sepgit.bilboard_id_seq'::regclass);
 :   ALTER TABLE sepgit.bilboard ALTER COLUMN id DROP DEFAULT;
       sepgit          postgres    false    214    215    215            �           2604    114720    media id    DEFAULT     d   ALTER TABLE ONLY sepgit.media ALTER COLUMN id SET DEFAULT nextval('sepgit.media_id_seq'::regclass);
 7   ALTER TABLE sepgit.media ALTER COLUMN id DROP DEFAULT;
       sepgit          postgres    false    213    212    213            �           2604    114709    story id    DEFAULT     d   ALTER TABLE ONLY sepgit.story ALTER COLUMN id SET DEFAULT nextval('sepgit.story_id_seq'::regclass);
 7   ALTER TABLE sepgit.story ALTER COLUMN id DROP DEFAULT;
       sepgit          postgres    false    210    211    211            Z          0    114779    course 
   TABLE DATA           �   COPY bootcamp.course (id, name_tm, name_en, name_ru, short_desc_tm, short_desc_ru, short_desc_en, highlight_tm, highlight_ru, highlight_en, desc_tm, desc_ru, desc_en, price, created_at, updated_at, image) FROM stdin;
    bootcamp          postgres    false    219   �_       \          0    114790    course_item 
   TABLE DATA           �   COPY bootcamp.course_item (id, name_tm, name_ru, name_en, desc_tm, desc_ru, desc_en, icon, item_type, created_at, updated_at, "position", course_id) FROM stdin;
    bootcamp          postgres    false    221   W`       `          0    114820    enroll 
   TABLE DATA           �   COPY bootcamp.enroll (id, fullname, email, phone_number, languages, find_us, course_id, created_at, updated_at, user_id) FROM stdin;
    bootcamp          postgres    false    225   Za       ^          0    114807    review 
   TABLE DATA           �   COPY bootcamp.review (id, fullname, email, phone_number, message, course_id, is_active, user_id, created_at, updated_at) FROM stdin;
    bootcamp          postgres    false    223   wa       X          0    114766    users 
   TABLE DATA           �   COPY bootcamp.users (id, fullname, username, password, phone_number, address, image, user_type, permission, created_at, updated_at) FROM stdin;
    bootcamp          postgres    false    217   b       b          0    114837    video_course 
   TABLE DATA           �   COPY bootcamp.video_course (id, title_tm, title_ru, title_en, image, desc_tm, desc_en, desc_ru, created_at, updated_at) FROM stdin;
    bootcamp          postgres    false    227   �b       d          0    114849 
   video_item 
   TABLE DATA           �   COPY bootcamp.video_item (id, title_tm, title_ru, title_en, creator, video_url, desc_tm, desc_ru, desc_en, sources, views, video_course_id, "position", created_at, updated_at) FROM stdin;
    bootcamp          postgres    false    229   Dc       V          0    114748    bilboard 
   TABLE DATA           �   COPY sepgit.bilboard (id, image_tm, image_en, image_ru, content_tm, content_ru, content_en, "position", created_at, updated_at) FROM stdin;
    sepgit          postgres    false    215   �c       T          0    114717    media 
   TABLE DATA           �   COPY sepgit.media (id, name, surname, job, image, topic_tm, topic_en, topic_ru, language, file_name, type, created_at, updated_at, duration) FROM stdin;
    sepgit          postgres    false    213   d       R          0    114706    story 
   TABLE DATA           t   COPY sepgit.story (id, fullname, organzation, image, text_tm, text_ru, text_en, created_at, updated_at) FROM stdin;
    sepgit          postgres    false    211   ,d       v           0    0    course_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('bootcamp.course_id_seq', 5, true);
          bootcamp          postgres    false    218            w           0    0    course_item_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('bootcamp.course_item_id_seq', 6, true);
          bootcamp          postgres    false    220            x           0    0    enroll_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('bootcamp.enroll_id_seq', 1, false);
          bootcamp          postgres    false    224            y           0    0    review_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('bootcamp.review_id_seq', 3, true);
          bootcamp          postgres    false    222            z           0    0    users_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('bootcamp.users_id_seq', 2, true);
          bootcamp          postgres    false    216            {           0    0    video_course_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('bootcamp.video_course_id_seq', 2, true);
          bootcamp          postgres    false    226            |           0    0    video_item_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('bootcamp.video_item_id_seq', 2, true);
          bootcamp          postgres    false    228            }           0    0    bilboard_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('sepgit.bilboard_id_seq', 1, false);
          sepgit          postgres    false    214            ~           0    0    media_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('sepgit.media_id_seq', 1, false);
          sepgit          postgres    false    212                       0    0    story_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('sepgit.story_id_seq', 1, false);
          sepgit          postgres    false    210            �           2606    114800    course_item course_item_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY bootcamp.course_item
    ADD CONSTRAINT course_item_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY bootcamp.course_item DROP CONSTRAINT course_item_pkey;
       bootcamp            postgres    false    221            �           2606    114788    course course_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY bootcamp.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY bootcamp.course DROP CONSTRAINT course_pkey;
       bootcamp            postgres    false    219            �           2606    114830    enroll enroll_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY bootcamp.enroll
    ADD CONSTRAINT enroll_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY bootcamp.enroll DROP CONSTRAINT enroll_pkey;
       bootcamp            postgres    false    225            �           2606    114818    review review_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY bootcamp.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY bootcamp.review DROP CONSTRAINT review_pkey;
       bootcamp            postgres    false    223            �           2606    114775    users users_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY bootcamp.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY bootcamp.users DROP CONSTRAINT users_pkey;
       bootcamp            postgres    false    217            �           2606    114846    video_course video_course_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY bootcamp.video_course
    ADD CONSTRAINT video_course_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY bootcamp.video_course DROP CONSTRAINT video_course_pkey;
       bootcamp            postgres    false    227            �           2606    114860    video_item video_item_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY bootcamp.video_item
    ADD CONSTRAINT video_item_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY bootcamp.video_item DROP CONSTRAINT video_item_pkey;
       bootcamp            postgres    false    229            �           2606    114758    bilboard bilboard_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY sepgit.bilboard
    ADD CONSTRAINT bilboard_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY sepgit.bilboard DROP CONSTRAINT bilboard_pkey;
       sepgit            postgres    false    215            �           2606    114726    media media_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY sepgit.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY sepgit.media DROP CONSTRAINT media_pkey;
       sepgit            postgres    false    213            �           2606    114715    story story_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY sepgit.story
    ADD CONSTRAINT story_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY sepgit.story DROP CONSTRAINT story_pkey;
       sepgit            postgres    false    211            �           2606    114801    course_item to_course    FK CONSTRAINT     �   ALTER TABLE ONLY bootcamp.course_item
    ADD CONSTRAINT to_course FOREIGN KEY (course_id) REFERENCES bootcamp.course(id) ON DELETE CASCADE NOT VALID;
 A   ALTER TABLE ONLY bootcamp.course_item DROP CONSTRAINT to_course;
       bootcamp          postgres    false    221    3256    219            �           2606    114831    enroll to_course    FK CONSTRAINT     �   ALTER TABLE ONLY bootcamp.enroll
    ADD CONSTRAINT to_course FOREIGN KEY (course_id) REFERENCES bootcamp.course(id) ON DELETE SET NULL;
 <   ALTER TABLE ONLY bootcamp.enroll DROP CONSTRAINT to_course;
       bootcamp          postgres    false    225    3256    219            �           2606    114861    video_item to_video_course    FK CONSTRAINT     �   ALTER TABLE ONLY bootcamp.video_item
    ADD CONSTRAINT to_video_course FOREIGN KEY (video_course_id) REFERENCES bootcamp.video_course(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY bootcamp.video_item DROP CONSTRAINT to_video_course;
       bootcamp          postgres    false    227    229    3264            Z   �   x�����0Fg�w��`��� l�&��;�Jb|{]�0�ɷ��$Gg��3
BLʸ���I�p��%���m�>u��LƕkP�#gs0�aF8�P�X7+�@t�3N��]�MQۓD�����r���������co{�Qm      \   �   x��ҿn�0��<c:`��|�a�g�T�?���`����
TƲ�$����q�_��Q7S�����lz1�孭�+C����0�S����c!WLl���������e��@��)�A��y�6gڋ����k_����)�u���_� �V12gm�M����D�$֬�^����,D \�/6�5JԀ�{Ѣ��UdК���ö�}�(��-(sJ���u;]0H��͆�Ki'�$���%�      `      x������ � �      ^   �   x���1�0����+�K���b�N:�����i1�`��/..J'�>x���¡����^o���3L��Z�4�>�i`�ɳ'"��{�i���>n8� ��He���a���1K��'��~6(����D��u������IQ)�D�a�      X   �   x�}�=�0E�_�Yix}�j�	nN��R�C�H�R��E,�u�p9�s��_k���9����{�lCJ� ��Iը릭�w;c�n[�f	�˳p
�:�e����<s��9�Nq����9�G��p����_=�Qj�SH\��_�8�      b   u   x�}�A
�  ���~@qw]��-�bt[
m(����sO300h��?��_�|���b e�<r�PT[ke��f�Z��+@��/w�t����8�=1 ���y��g���䭵?�X+�      d   �   x�}�K
� EǺ
P�Z�1�Bg�A��
>�����i�����A[ܫ�S�z����[*�W\�|�w]=�H ��Yb�Q0�.`]�i#�<�ud���m�l��Y��`���{����i-�]~�1$G��+e�rE����{֩q��g��c�x�@k      V      x������ � �      T      x������ � �      R      x������ � �     