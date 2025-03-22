PGDMP      +    	            }            postgres    16.3    16.0 O    "           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            #           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            $           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            %           1262    5    postgres    DATABASE     t   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE postgres;
                postgres    false            &           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    4389                        2615    17288    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            '           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5            (           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            �            1259    17290 	   categoria    TABLE     b   CREATE TABLE public.categoria (
    id integer NOT NULL,
    nombre character varying NOT NULL
);
    DROP TABLE public.categoria;
       public         heap    postgres    false    5            �            1259    17295    categoria_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.categoria_id_seq;
       public          postgres    false    5    215            )           0    0    categoria_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.categoria_id_seq OWNED BY public.categoria.id;
          public          postgres    false    216            �            1259    17296    contratacion    TABLE     �  CREATE TABLE public.contratacion (
    id integer NOT NULL,
    "selectedDays" text NOT NULL,
    "startTime" timestamp with time zone NOT NULL,
    "endTime" timestamp with time zone NOT NULL,
    "selectedCategory" character varying NOT NULL,
    "totalPrice" double precision NOT NULL,
    instructions character varying,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "usuarioId" integer,
    "cuidadorId" integer
);
     DROP TABLE public.contratacion;
       public         heap    postgres    false    5            �            1259    17302    contratacion_id_seq    SEQUENCE     �   CREATE SEQUENCE public.contratacion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.contratacion_id_seq;
       public          postgres    false    5    217            *           0    0    contratacion_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.contratacion_id_seq OWNED BY public.contratacion.id;
          public          postgres    false    218            �            1259    17303    cuidador    TABLE     <  CREATE TABLE public.cuidador (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    direccion character varying NOT NULL,
    "precioPorHora" numeric(10,2) NOT NULL,
    disponibilidad character varying NOT NULL,
    "urlImagen" character varying NOT NULL,
    descripcion character varying,
    experiencia integer DEFAULT 0 NOT NULL,
    rating double precision DEFAULT '0'::double precision NOT NULL,
    telefono character varying NOT NULL,
    certificaciones character varying,
    "horarioAtencion" character varying,
    source character varying
);
    DROP TABLE public.cuidador;
       public         heap    postgres    false    5            �            1259    17310    cuidador_categoria    TABLE     p   CREATE TABLE public.cuidador_categoria (
    cuidador_id integer NOT NULL,
    categoria_id integer NOT NULL
);
 &   DROP TABLE public.cuidador_categoria;
       public         heap    postgres    false    5            �            1259    17313    cuidador_dia    TABLE     k   CREATE TABLE public.cuidador_dia (
    cuidador_id integer NOT NULL,
    dia_semana_id integer NOT NULL
);
     DROP TABLE public.cuidador_dia;
       public         heap    postgres    false    5            �            1259    17316    cuidador_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cuidador_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.cuidador_id_seq;
       public          postgres    false    5    219            +           0    0    cuidador_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.cuidador_id_seq OWNED BY public.cuidador.id;
          public          postgres    false    222            �            1259    17317 
   dia_semana    TABLE     c   CREATE TABLE public.dia_semana (
    id integer NOT NULL,
    nombre character varying NOT NULL
);
    DROP TABLE public.dia_semana;
       public         heap    postgres    false    5            �            1259    17322    dia_semana_id_seq    SEQUENCE     �   CREATE SEQUENCE public.dia_semana_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.dia_semana_id_seq;
       public          postgres    false    5    223            ,           0    0    dia_semana_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.dia_semana_id_seq OWNED BY public.dia_semana.id;
          public          postgres    false    224            �            1259    17323    resena    TABLE     �   CREATE TABLE public.resena (
    id integer NOT NULL,
    comentario character varying NOT NULL,
    calificacion double precision NOT NULL,
    "cuidadorId" integer,
    "usuarioId" integer
);
    DROP TABLE public.resena;
       public         heap    postgres    false    5            �            1259    17328    resena_id_seq    SEQUENCE     �   CREATE SEQUENCE public.resena_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.resena_id_seq;
       public          postgres    false    5    225            -           0    0    resena_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.resena_id_seq OWNED BY public.resena.id;
          public          postgres    false    226            �            1259    17329    rol    TABLE     a   CREATE TABLE public.rol (
    id integer NOT NULL,
    "nombreRol" character varying NOT NULL
);
    DROP TABLE public.rol;
       public         heap    postgres    false    5            �            1259    17334 
   rol_id_seq    SEQUENCE     �   CREATE SEQUENCE public.rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.rol_id_seq;
       public          postgres    false    5    227            .           0    0 
   rol_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.rol_id_seq OWNED BY public.rol.id;
          public          postgres    false    228            �            1259    17335    usuario    TABLE     �   CREATE TABLE public.usuario (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    email character varying NOT NULL,
    "imageUrl" character varying,
    password character varying NOT NULL,
    "rolId" integer
);
    DROP TABLE public.usuario;
       public         heap    postgres    false    5            �            1259    17340    usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.usuario_id_seq;
       public          postgres    false    5    229            /           0    0    usuario_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;
          public          postgres    false    230            R           2604    17341    categoria id    DEFAULT     l   ALTER TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public.categoria_id_seq'::regclass);
 ;   ALTER TABLE public.categoria ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            S           2604    17342    contratacion id    DEFAULT     r   ALTER TABLE ONLY public.contratacion ALTER COLUMN id SET DEFAULT nextval('public.contratacion_id_seq'::regclass);
 >   ALTER TABLE public.contratacion ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            U           2604    17343    cuidador id    DEFAULT     j   ALTER TABLE ONLY public.cuidador ALTER COLUMN id SET DEFAULT nextval('public.cuidador_id_seq'::regclass);
 :   ALTER TABLE public.cuidador ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    219            X           2604    17344    dia_semana id    DEFAULT     n   ALTER TABLE ONLY public.dia_semana ALTER COLUMN id SET DEFAULT nextval('public.dia_semana_id_seq'::regclass);
 <   ALTER TABLE public.dia_semana ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223            Y           2604    17345 	   resena id    DEFAULT     f   ALTER TABLE ONLY public.resena ALTER COLUMN id SET DEFAULT nextval('public.resena_id_seq'::regclass);
 8   ALTER TABLE public.resena ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225            Z           2604    17346    rol id    DEFAULT     `   ALTER TABLE ONLY public.rol ALTER COLUMN id SET DEFAULT nextval('public.rol_id_seq'::regclass);
 5   ALTER TABLE public.rol ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227            [           2604    17347 
   usuario id    DEFAULT     h   ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 9   ALTER TABLE public.usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229                      0    17290 	   categoria 
   TABLE DATA           /   COPY public.categoria (id, nombre) FROM stdin;
    public          postgres    false    215   �^                 0    17296    contratacion 
   TABLE DATA           �   COPY public.contratacion (id, "selectedDays", "startTime", "endTime", "selectedCategory", "totalPrice", instructions, "createdAt", "usuarioId", "cuidadorId") FROM stdin;
    public          postgres    false    217   �^                 0    17303    cuidador 
   TABLE DATA           �   COPY public.cuidador (id, nombre, direccion, "precioPorHora", disponibilidad, "urlImagen", descripcion, experiencia, rating, telefono, certificaciones, "horarioAtencion", source) FROM stdin;
    public          postgres    false    219   `                 0    17310    cuidador_categoria 
   TABLE DATA           G   COPY public.cuidador_categoria (cuidador_id, categoria_id) FROM stdin;
    public          postgres    false    220   �i                 0    17313    cuidador_dia 
   TABLE DATA           B   COPY public.cuidador_dia (cuidador_id, dia_semana_id) FROM stdin;
    public          postgres    false    221   �i                 0    17317 
   dia_semana 
   TABLE DATA           0   COPY public.dia_semana (id, nombre) FROM stdin;
    public          postgres    false    223   .j                 0    17323    resena 
   TABLE DATA           Y   COPY public.resena (id, comentario, calificacion, "cuidadorId", "usuarioId") FROM stdin;
    public          postgres    false    225   �j                 0    17329    rol 
   TABLE DATA           .   COPY public.rol (id, "nombreRol") FROM stdin;
    public          postgres    false    227   �k                 0    17335    usuario 
   TABLE DATA           S   COPY public.usuario (id, nombre, email, "imageUrl", password, "rolId") FROM stdin;
    public          postgres    false    229   l       0           0    0    categoria_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.categoria_id_seq', 6, true);
          public          postgres    false    216            1           0    0    contratacion_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.contratacion_id_seq', 10, true);
          public          postgres    false    218            2           0    0    cuidador_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.cuidador_id_seq', 8, true);
          public          postgres    false    222            3           0    0    dia_semana_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.dia_semana_id_seq', 1, false);
          public          postgres    false    224            4           0    0    resena_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.resena_id_seq', 28, true);
          public          postgres    false    226            5           0    0 
   rol_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.rol_id_seq', 1, false);
          public          postgres    false    228            6           0    0    usuario_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.usuario_id_seq', 8, true);
          public          postgres    false    230            k           2606    17349 +   cuidador_dia PK_05a43f7df252256e49aba8c8bd6 
   CONSTRAINT     �   ALTER TABLE ONLY public.cuidador_dia
    ADD CONSTRAINT "PK_05a43f7df252256e49aba8c8bd6" PRIMARY KEY (cuidador_id, dia_semana_id);
 W   ALTER TABLE ONLY public.cuidador_dia DROP CONSTRAINT "PK_05a43f7df252256e49aba8c8bd6";
       public            postgres    false    221    221            m           2606    17351 )   dia_semana PK_26175611982d2505ce95ec1084c 
   CONSTRAINT     i   ALTER TABLE ONLY public.dia_semana
    ADD CONSTRAINT "PK_26175611982d2505ce95ec1084c" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.dia_semana DROP CONSTRAINT "PK_26175611982d2505ce95ec1084c";
       public            postgres    false    223            o           2606    17353 %   resena PK_86a5436f2c16b141185f9263bfb 
   CONSTRAINT     e   ALTER TABLE ONLY public.resena
    ADD CONSTRAINT "PK_86a5436f2c16b141185f9263bfb" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.resena DROP CONSTRAINT "PK_86a5436f2c16b141185f9263bfb";
       public            postgres    false    225            u           2606    17355 &   usuario PK_a56c58e5cabaa04fb2c98d2d7e2 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2";
       public            postgres    false    229            g           2606    17357 1   cuidador_categoria PK_a8405bc69d641497f2411f19781 
   CONSTRAINT     �   ALTER TABLE ONLY public.cuidador_categoria
    ADD CONSTRAINT "PK_a8405bc69d641497f2411f19781" PRIMARY KEY (cuidador_id, categoria_id);
 ]   ALTER TABLE ONLY public.cuidador_categoria DROP CONSTRAINT "PK_a8405bc69d641497f2411f19781";
       public            postgres    false    220    220            q           2606    17359 "   rol PK_c93a22388638fac311781c7f2dd 
   CONSTRAINT     b   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.rol DROP CONSTRAINT "PK_c93a22388638fac311781c7f2dd";
       public            postgres    false    227            a           2606    17361 +   contratacion PK_d07167129668f45405b246a0707 
   CONSTRAINT     k   ALTER TABLE ONLY public.contratacion
    ADD CONSTRAINT "PK_d07167129668f45405b246a0707" PRIMARY KEY (id);
 W   ALTER TABLE ONLY public.contratacion DROP CONSTRAINT "PK_d07167129668f45405b246a0707";
       public            postgres    false    217            ]           2606    17363 (   categoria PK_f027836b77b84fb4c3a374dc70d 
   CONSTRAINT     h   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.categoria DROP CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d";
       public            postgres    false    215            c           2606    17365 '   cuidador PK_f1156eddcbdd20932d20c8fbf08 
   CONSTRAINT     g   ALTER TABLE ONLY public.cuidador
    ADD CONSTRAINT "PK_f1156eddcbdd20932d20c8fbf08" PRIMARY KEY (id);
 S   ALTER TABLE ONLY public.cuidador DROP CONSTRAINT "PK_f1156eddcbdd20932d20c8fbf08";
       public            postgres    false    219            s           2606    17367 "   rol UQ_003723e69e9feaf8cc470f233af 
   CONSTRAINT     f   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT "UQ_003723e69e9feaf8cc470f233af" UNIQUE ("nombreRol");
 N   ALTER TABLE ONLY public.rol DROP CONSTRAINT "UQ_003723e69e9feaf8cc470f233af";
       public            postgres    false    227            w           2606    17369 &   usuario UQ_2863682842e688ca198eb25c124 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE (email);
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "UQ_2863682842e688ca198eb25c124";
       public            postgres    false    229            _           2606    17371 (   categoria UQ_6771d90221138c5bf48044fd73d 
   CONSTRAINT     g   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT "UQ_6771d90221138c5bf48044fd73d" UNIQUE (nombre);
 T   ALTER TABLE ONLY public.categoria DROP CONSTRAINT "UQ_6771d90221138c5bf48044fd73d";
       public            postgres    false    215            h           1259    17372    IDX_669350a09a2929d57eaaecc6f5    INDEX     b   CREATE INDEX "IDX_669350a09a2929d57eaaecc6f5" ON public.cuidador_dia USING btree (dia_semana_id);
 4   DROP INDEX public."IDX_669350a09a2929d57eaaecc6f5";
       public            postgres    false    221            i           1259    17373    IDX_9b11d6da7d65c8c09570d33f2b    INDEX     `   CREATE INDEX "IDX_9b11d6da7d65c8c09570d33f2b" ON public.cuidador_dia USING btree (cuidador_id);
 4   DROP INDEX public."IDX_9b11d6da7d65c8c09570d33f2b";
       public            postgres    false    221            d           1259    17374    IDX_a2d73f5561b82f469a1e582b1f    INDEX     f   CREATE INDEX "IDX_a2d73f5561b82f469a1e582b1f" ON public.cuidador_categoria USING btree (cuidador_id);
 4   DROP INDEX public."IDX_a2d73f5561b82f469a1e582b1f";
       public            postgres    false    220            e           1259    17375    IDX_b77dac79756b274a6a1030da59    INDEX     g   CREATE INDEX "IDX_b77dac79756b274a6a1030da59" ON public.cuidador_categoria USING btree (categoria_id);
 4   DROP INDEX public."IDX_b77dac79756b274a6a1030da59";
       public            postgres    false    220            x           2606    17376 +   contratacion FK_30f53e7a7604f66beeeceb8e04a    FK CONSTRAINT     �   ALTER TABLE ONLY public.contratacion
    ADD CONSTRAINT "FK_30f53e7a7604f66beeeceb8e04a" FOREIGN KEY ("usuarioId") REFERENCES public.usuario(id);
 W   ALTER TABLE ONLY public.contratacion DROP CONSTRAINT "FK_30f53e7a7604f66beeeceb8e04a";
       public          postgres    false    229    4213    217            �           2606    17381 &   usuario FK_611daf5befc024d9e0bd7bdf4da    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "FK_611daf5befc024d9e0bd7bdf4da" FOREIGN KEY ("rolId") REFERENCES public.rol(id);
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "FK_611daf5befc024d9e0bd7bdf4da";
       public          postgres    false    229    4209    227            |           2606    17386 +   cuidador_dia FK_669350a09a2929d57eaaecc6f5f    FK CONSTRAINT     �   ALTER TABLE ONLY public.cuidador_dia
    ADD CONSTRAINT "FK_669350a09a2929d57eaaecc6f5f" FOREIGN KEY (dia_semana_id) REFERENCES public.dia_semana(id);
 W   ALTER TABLE ONLY public.cuidador_dia DROP CONSTRAINT "FK_669350a09a2929d57eaaecc6f5f";
       public          postgres    false    221    223    4205            ~           2606    17391 %   resena FK_766f16b1a880eae96c7e230a339    FK CONSTRAINT     �   ALTER TABLE ONLY public.resena
    ADD CONSTRAINT "FK_766f16b1a880eae96c7e230a339" FOREIGN KEY ("cuidadorId") REFERENCES public.cuidador(id);
 Q   ALTER TABLE ONLY public.resena DROP CONSTRAINT "FK_766f16b1a880eae96c7e230a339";
       public          postgres    false    219    225    4195            }           2606    17396 +   cuidador_dia FK_9b11d6da7d65c8c09570d33f2be    FK CONSTRAINT     �   ALTER TABLE ONLY public.cuidador_dia
    ADD CONSTRAINT "FK_9b11d6da7d65c8c09570d33f2be" FOREIGN KEY (cuidador_id) REFERENCES public.cuidador(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.cuidador_dia DROP CONSTRAINT "FK_9b11d6da7d65c8c09570d33f2be";
       public          postgres    false    4195    221    219            z           2606    17401 1   cuidador_categoria FK_a2d73f5561b82f469a1e582b1ff    FK CONSTRAINT     �   ALTER TABLE ONLY public.cuidador_categoria
    ADD CONSTRAINT "FK_a2d73f5561b82f469a1e582b1ff" FOREIGN KEY (cuidador_id) REFERENCES public.cuidador(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.cuidador_categoria DROP CONSTRAINT "FK_a2d73f5561b82f469a1e582b1ff";
       public          postgres    false    4195    219    220            {           2606    17406 1   cuidador_categoria FK_b77dac79756b274a6a1030da590    FK CONSTRAINT     �   ALTER TABLE ONLY public.cuidador_categoria
    ADD CONSTRAINT "FK_b77dac79756b274a6a1030da590" FOREIGN KEY (categoria_id) REFERENCES public.categoria(id);
 ]   ALTER TABLE ONLY public.cuidador_categoria DROP CONSTRAINT "FK_b77dac79756b274a6a1030da590";
       public          postgres    false    220    215    4189                       2606    17411 %   resena FK_bc1bb94c1f6fd9a8ffa94141f1a    FK CONSTRAINT     �   ALTER TABLE ONLY public.resena
    ADD CONSTRAINT "FK_bc1bb94c1f6fd9a8ffa94141f1a" FOREIGN KEY ("usuarioId") REFERENCES public.usuario(id);
 Q   ALTER TABLE ONLY public.resena DROP CONSTRAINT "FK_bc1bb94c1f6fd9a8ffa94141f1a";
       public          postgres    false    229    4213    225            y           2606    17416 +   contratacion FK_bdcaabe548139fe03045d550227    FK CONSTRAINT     �   ALTER TABLE ONLY public.contratacion
    ADD CONSTRAINT "FK_bdcaabe548139fe03045d550227" FOREIGN KEY ("cuidadorId") REFERENCES public.cuidador(id);
 W   ALTER TABLE ONLY public.contratacion DROP CONSTRAINT "FK_bdcaabe548139fe03045d550227";
       public          postgres    false    4195    217    219               N   x�3���KK�+���2�I-JN-JTpMIL�2�t�,NN,HL�,IL��2�t̩�H��M-�2��K��K,I������ ��         !  x����N�0 �s���"۱�6gp�/�%e�M��O:�me��������n���d4�p{�"��P���ȧ���%�w���^�ya"*�P��̟ʱt��jay�z�QU*���)Ju��R�2�-�Ǣub�1k=Xr�R��ךe��j�$�����a�i�g����zbW濄JZ& ���oV�=��.������WT{�g�8L�q��ܵ�r�>�m��/��l��ܹ��[��].�b�>��!չ��m����ݱ�Zb��=�so��,��         �	  x��X�r�F]C_� i>�Wv���d�J4q�'5��ФZ��n��7Zz�E*�l�csnw@JIUb/\"ٯ���s��EpKZRxM:����?��(��!�K�@���[�-E2�G���@�d9����e&L�!��=�*x(��|����T�())�*�٨4CA�NF��Ae�E*}�2�L-L��d��o�k����	N&�r���"�;E��a,B�d��	#L���(Ǧ�U�A�@bHk�$<���e�~��VL�bL�YH�@�:4�	3	�[}�Ȉ�(� xՂ"
sŃ�w�k�J��Hs*�/���,n�H�a�q�#�B�FlK�0�"�����F���2��Yi�.��Q�'��HS�+هZ��
?+�גJ�6ZpRy�\�U(��VS~*vJq
�^*S�;8��O�Aj��Si?�~$_�(X��U�X�W���t\����������Q�+�Wߌ����W����?���_\�Z���D�pK[�.�����ɩ��� \���[X���gۿ��\<��K�K������d��'S�[zp�9Tg^��3��7����d��2��X%�D ��b��r��!c<fx*ɴL�~m/{4xo��E y�d{�%t����XT��qj�PTȝ~R�[�a�����>��y�������(�,��A�3��
��4Wv�����%�j'M�yD���ۡ��3F���Y�[���k"��O	�)�)ߙ�,&`��6��V��d�o��[{1q�0S���oψL�L?7|�p)��i�����|$dt��`���͡�.�6�##�[��T1d]�$�,T�;Ȳ����|���w3
.��Y�X�֠�tvd睈%�
&cKF�d�����
k0�d&�,E��Nd���iLuطb�����������x=�T��j����� ���x�RR�����r4w��>��n��]%�!S�\�V�k�k�!L�l���s�⚳���JO����d�I��p��w��	>���������f(ICu�O+�3At�,oM�����ueL�	l:`N�VX�K˞���	1�	�̢�ܻ�@1�hs��>�5��h��c";9�}�l\���E�_�Xk(��.�ʋʑ�N�ĩN�fua���K��+�_2.�=ҌyU�D�J��l� ���%H���d5�2I�'r��h�������3ve}�
�I�u��ڱݠ@����Z�L�2b�?�B��d9�����x�XL��R�)�-�"N���p4�	V��5��+`ó������w8�*S��ޠzF�2N^!��Q|O�Ү���,���k�X�V����EB�5H��-�ՔQV�;�yg��8�>�k A�w���[6����ޛD<��ӳ�0��Ԗ",=:�%��#8[+d]U���A]�=!j�hlkˁ�H�30\E�X}���zU�V��-��Q_��������/qN[rea��-�I&{��d�p,f���b�Zoe������6��!{������w�9E��3dR5��bHc׵�ڦ����+�pvbY�V�}����Znе�tJ�#mo�R]����Ʃ�0C�U%�������F�]g_�dF�3�F��.gl\��Y�ח���D߰)v���6l��`�>��Ť�S� �VJ+�j�����WBHL���i�2��t=y�_۶WZ|��)��e��rWC1^��[N���\�^�s4E�FEu4�8˕�&��E����P)K� �4ֻ�z�����q��{���G;]�ǟ�}&��"z-�- <ǫ�S;�'Ú඿I�l$e�.p~8b#���ve5_B)��3\��+땯��Xf`��?����ven>�.0�4���y�ϺymBD����.3զ��k�Ɽ,����B'��zy9;�//`��I� �N�fe���Ղ4�i=h�m������+�Y�� o~���v��*d�/�/�׍�_��a8%��w�:�wf>u&�q�O�A��x>t^&^z7���������X?[P�4�����2����O��{P�RR�E�8v�*�t�����M7#%���~�%Γ�����ms׽W[�`q���j5Y�>�}�!W���w7s�!�mU-~ @z�581{�k*@����t�~�[��9,o�z�;h��Ÿ���
Qr�{���j��fd'46;�3�=[|UΏ��
�Z�ݚ4�`���#���	ִ��]~d?�z�?�٨{!�qYt������iz���x6 ���{Ovn�`�2s1���2붸�b~s��3�p`9#y���/C��U�&M`�=7���{�q��e�u����i'��y����C���I��P�_7���nx�t��y>l$�Z5��bJ���v�E͙l��S>�m��h�d����7Ӹ��es6��kx�b��M&������B_~]\\�*̖C            x�3�4�2�4�2�4b�=... m�         D   x�ʹ 0���[����(`97�[�ҵ˒�<�Qr'�Ċ��k�����_l�G����         L   x�3��)�K-�2��M,*2�9}3�,J��rL8�JSˀSΰ��"�B3����S��9]�s3���b���� ya         `  x�EPKN�0]ۧ.�C��)B�R6C24�;�Qn��@!c���{�߯�B�ꞏT�v����;��8�� Y�:��^�!銡;QJU�;L~v�y�p����_.`Q�d������"_��@��]�De&R������8�1�wv�}�d���/���-i��>83��S:��`dL���J�&铍	��{���ES0�̘�xJq\�]�i�!:�΂�4���I	��ã��~�De�W�hq0���j���m.,�F�/\/Z�BK�T���/����\�=1��ԓ��$�'k�m�����^��"͵ӟ>:N�lb����,��U!���~��            x������ � �         F  x���K�A�u����%�J��*d?9��Q�c����m'���X��E����$>~	�����|��ɾ�m��8|�^���vk�L��n���Ӹ�x[��r�h��'���'���^�-�w���	q��iR�Z��}`��	Z#g� 5��}�o���mCH���#zeV�C䠭y(] ~r,F��ձi�Iӿ&������>}z����H�;	��I��YX"���Đ�S�B~�J�U]���L�Q��r��J��R?���jK���\Ky6�SXϔ������}yog�ܟ�$��(�:=���R/[�G(���#q���z7��_��     