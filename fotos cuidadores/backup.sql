PGDMP                       }            postgres    16.3    16.0 C               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    5    postgres    DATABASE     t   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE postgres;
                postgres    false                       0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    4376            �            1259    16598 	   categoria    TABLE     b   CREATE TABLE public.categoria (
    id integer NOT NULL,
    nombre character varying NOT NULL
);
    DROP TABLE public.categoria;
       public         heap    postgres    false            �            1259    16597    categoria_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.categoria_id_seq;
       public          postgres    false    220                       0    0    categoria_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.categoria_id_seq OWNED BY public.categoria.id;
          public          postgres    false    219            �            1259    16609    cuidador    TABLE       CREATE TABLE public.cuidador (
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
    "horarioAtencion" character varying
);
    DROP TABLE public.cuidador;
       public         heap    postgres    false            �            1259    16738    cuidador_categoria    TABLE     p   CREATE TABLE public.cuidador_categoria (
    cuidador_id integer NOT NULL,
    categoria_id integer NOT NULL
);
 &   DROP TABLE public.cuidador_categoria;
       public         heap    postgres    false            �            1259    16745    cuidador_dia    TABLE     k   CREATE TABLE public.cuidador_dia (
    cuidador_id integer NOT NULL,
    dia_semana_id integer NOT NULL
);
     DROP TABLE public.cuidador_dia;
       public         heap    postgres    false            �            1259    16608    cuidador_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cuidador_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.cuidador_id_seq;
       public          postgres    false    222                       0    0    cuidador_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.cuidador_id_seq OWNED BY public.cuidador.id;
          public          postgres    false    221            �            1259    16713 
   dia_semana    TABLE     c   CREATE TABLE public.dia_semana (
    id integer NOT NULL,
    nombre character varying NOT NULL
);
    DROP TABLE public.dia_semana;
       public         heap    postgres    false            �            1259    16712    dia_semana_id_seq    SEQUENCE     �   CREATE SEQUENCE public.dia_semana_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.dia_semana_id_seq;
       public          postgres    false    226                       0    0    dia_semana_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.dia_semana_id_seq OWNED BY public.dia_semana.id;
          public          postgres    false    225            �            1259    16637    resena    TABLE     �   CREATE TABLE public.resena (
    id integer NOT NULL,
    comentario character varying NOT NULL,
    calificacion double precision NOT NULL,
    "cuidadorId" integer,
    "usuarioId" integer
);
    DROP TABLE public.resena;
       public         heap    postgres    false            �            1259    16636    resena_id_seq    SEQUENCE     �   CREATE SEQUENCE public.resena_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.resena_id_seq;
       public          postgres    false    224                       0    0    resena_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.resena_id_seq OWNED BY public.resena.id;
          public          postgres    false    223            �            1259    16554    rol    TABLE     a   CREATE TABLE public.rol (
    id integer NOT NULL,
    "nombreRol" character varying NOT NULL
);
    DROP TABLE public.rol;
       public         heap    postgres    false            �            1259    16553 
   rol_id_seq    SEQUENCE     �   CREATE SEQUENCE public.rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.rol_id_seq;
       public          postgres    false    216                       0    0 
   rol_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.rol_id_seq OWNED BY public.rol.id;
          public          postgres    false    215            �            1259    16582    usuario    TABLE     �   CREATE TABLE public.usuario (
    id integer NOT NULL,
    nombre character varying NOT NULL,
    email character varying NOT NULL,
    "imageUrl" character varying,
    "rolId" integer
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    16581    usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.usuario_id_seq;
       public          postgres    false    218                       0    0    usuario_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;
          public          postgres    false    217            O           2604    16601    categoria id    DEFAULT     l   ALTER TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public.categoria_id_seq'::regclass);
 ;   ALTER TABLE public.categoria ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            P           2604    16612    cuidador id    DEFAULT     j   ALTER TABLE ONLY public.cuidador ALTER COLUMN id SET DEFAULT nextval('public.cuidador_id_seq'::regclass);
 :   ALTER TABLE public.cuidador ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            T           2604    16716    dia_semana id    DEFAULT     n   ALTER TABLE ONLY public.dia_semana ALTER COLUMN id SET DEFAULT nextval('public.dia_semana_id_seq'::regclass);
 <   ALTER TABLE public.dia_semana ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225    226            S           2604    16640 	   resena id    DEFAULT     f   ALTER TABLE ONLY public.resena ALTER COLUMN id SET DEFAULT nextval('public.resena_id_seq'::regclass);
 8   ALTER TABLE public.resena ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            M           2604    16557    rol id    DEFAULT     `   ALTER TABLE ONLY public.rol ALTER COLUMN id SET DEFAULT nextval('public.rol_id_seq'::regclass);
 5   ALTER TABLE public.rol ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            N           2604    16585 
   usuario id    DEFAULT     h   ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);
 9   ALTER TABLE public.usuario ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            
          0    16598 	   categoria 
   TABLE DATA           /   COPY public.categoria (id, nombre) FROM stdin;
    public          postgres    false    220   O                 0    16609    cuidador 
   TABLE DATA           �   COPY public.cuidador (id, nombre, direccion, "precioPorHora", disponibilidad, "urlImagen", descripcion, experiencia, rating, telefono, certificaciones, "horarioAtencion") FROM stdin;
    public          postgres    false    222   oO                 0    16738    cuidador_categoria 
   TABLE DATA           G   COPY public.cuidador_categoria (cuidador_id, categoria_id) FROM stdin;
    public          postgres    false    227   Y                 0    16745    cuidador_dia 
   TABLE DATA           B   COPY public.cuidador_dia (cuidador_id, dia_semana_id) FROM stdin;
    public          postgres    false    228   GY                 0    16713 
   dia_semana 
   TABLE DATA           0   COPY public.dia_semana (id, nombre) FROM stdin;
    public          postgres    false    226   �Y                 0    16637    resena 
   TABLE DATA           Y   COPY public.resena (id, comentario, calificacion, "cuidadorId", "usuarioId") FROM stdin;
    public          postgres    false    224   �Y                 0    16554    rol 
   TABLE DATA           .   COPY public.rol (id, "nombreRol") FROM stdin;
    public          postgres    false    216   Z                 0    16582    usuario 
   TABLE DATA           I   COPY public.usuario (id, nombre, email, "imageUrl", "rolId") FROM stdin;
    public          postgres    false    218   1Z                   0    0    categoria_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.categoria_id_seq', 6, true);
          public          postgres    false    219            !           0    0    cuidador_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.cuidador_id_seq', 8, true);
          public          postgres    false    221            "           0    0    dia_semana_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.dia_semana_id_seq', 1, false);
          public          postgres    false    225            #           0    0    resena_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.resena_id_seq', 1, false);
          public          postgres    false    223            $           0    0 
   rol_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.rol_id_seq', 1, false);
          public          postgres    false    215            %           0    0    usuario_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.usuario_id_seq', 7, true);
          public          postgres    false    217            n           2606    16784 +   cuidador_dia PK_05a43f7df252256e49aba8c8bd6 
   CONSTRAINT     �   ALTER TABLE ONLY public.cuidador_dia
    ADD CONSTRAINT "PK_05a43f7df252256e49aba8c8bd6" PRIMARY KEY (cuidador_id, dia_semana_id);
 W   ALTER TABLE ONLY public.cuidador_dia DROP CONSTRAINT "PK_05a43f7df252256e49aba8c8bd6";
       public            postgres    false    228    228            f           2606    16720 )   dia_semana PK_26175611982d2505ce95ec1084c 
   CONSTRAINT     i   ALTER TABLE ONLY public.dia_semana
    ADD CONSTRAINT "PK_26175611982d2505ce95ec1084c" PRIMARY KEY (id);
 U   ALTER TABLE ONLY public.dia_semana DROP CONSTRAINT "PK_26175611982d2505ce95ec1084c";
       public            postgres    false    226            d           2606    16644 %   resena PK_86a5436f2c16b141185f9263bfb 
   CONSTRAINT     e   ALTER TABLE ONLY public.resena
    ADD CONSTRAINT "PK_86a5436f2c16b141185f9263bfb" PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public.resena DROP CONSTRAINT "PK_86a5436f2c16b141185f9263bfb";
       public            postgres    false    224            Z           2606    16589 &   usuario PK_a56c58e5cabaa04fb2c98d2d7e2 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2";
       public            postgres    false    218            j           2606    16780 1   cuidador_categoria PK_a8405bc69d641497f2411f19781 
   CONSTRAINT     �   ALTER TABLE ONLY public.cuidador_categoria
    ADD CONSTRAINT "PK_a8405bc69d641497f2411f19781" PRIMARY KEY (cuidador_id, categoria_id);
 ]   ALTER TABLE ONLY public.cuidador_categoria DROP CONSTRAINT "PK_a8405bc69d641497f2411f19781";
       public            postgres    false    227    227            V           2606    16561 "   rol PK_c93a22388638fac311781c7f2dd 
   CONSTRAINT     b   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.rol DROP CONSTRAINT "PK_c93a22388638fac311781c7f2dd";
       public            postgres    false    216            ^           2606    16605 (   categoria PK_f027836b77b84fb4c3a374dc70d 
   CONSTRAINT     h   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.categoria DROP CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d";
       public            postgres    false    220            b           2606    16618 '   cuidador PK_f1156eddcbdd20932d20c8fbf08 
   CONSTRAINT     g   ALTER TABLE ONLY public.cuidador
    ADD CONSTRAINT "PK_f1156eddcbdd20932d20c8fbf08" PRIMARY KEY (id);
 S   ALTER TABLE ONLY public.cuidador DROP CONSTRAINT "PK_f1156eddcbdd20932d20c8fbf08";
       public            postgres    false    222            X           2606    16563 "   rol UQ_003723e69e9feaf8cc470f233af 
   CONSTRAINT     f   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT "UQ_003723e69e9feaf8cc470f233af" UNIQUE ("nombreRol");
 N   ALTER TABLE ONLY public.rol DROP CONSTRAINT "UQ_003723e69e9feaf8cc470f233af";
       public            postgres    false    216            \           2606    16591 &   usuario UQ_2863682842e688ca198eb25c124 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE (email);
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "UQ_2863682842e688ca198eb25c124";
       public            postgres    false    218            `           2606    16607 (   categoria UQ_6771d90221138c5bf48044fd73d 
   CONSTRAINT     g   ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT "UQ_6771d90221138c5bf48044fd73d" UNIQUE (nombre);
 T   ALTER TABLE ONLY public.categoria DROP CONSTRAINT "UQ_6771d90221138c5bf48044fd73d";
       public            postgres    false    220            k           1259    16788    IDX_669350a09a2929d57eaaecc6f5    INDEX     b   CREATE INDEX "IDX_669350a09a2929d57eaaecc6f5" ON public.cuidador_dia USING btree (dia_semana_id);
 4   DROP INDEX public."IDX_669350a09a2929d57eaaecc6f5";
       public            postgres    false    228            l           1259    16787    IDX_9b11d6da7d65c8c09570d33f2b    INDEX     `   CREATE INDEX "IDX_9b11d6da7d65c8c09570d33f2b" ON public.cuidador_dia USING btree (cuidador_id);
 4   DROP INDEX public."IDX_9b11d6da7d65c8c09570d33f2b";
       public            postgres    false    228            g           1259    16785    IDX_a2d73f5561b82f469a1e582b1f    INDEX     f   CREATE INDEX "IDX_a2d73f5561b82f469a1e582b1f" ON public.cuidador_categoria USING btree (cuidador_id);
 4   DROP INDEX public."IDX_a2d73f5561b82f469a1e582b1f";
       public            postgres    false    227            h           1259    16786    IDX_b77dac79756b274a6a1030da59    INDEX     g   CREATE INDEX "IDX_b77dac79756b274a6a1030da59" ON public.cuidador_categoria USING btree (categoria_id);
 4   DROP INDEX public."IDX_b77dac79756b274a6a1030da59";
       public            postgres    false    227            o           2606    16592 &   usuario FK_611daf5befc024d9e0bd7bdf4da    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "FK_611daf5befc024d9e0bd7bdf4da" FOREIGN KEY ("rolId") REFERENCES public.rol(id);
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "FK_611daf5befc024d9e0bd7bdf4da";
       public          postgres    false    216    218    4182            t           2606    16804 +   cuidador_dia FK_669350a09a2929d57eaaecc6f5f    FK CONSTRAINT     �   ALTER TABLE ONLY public.cuidador_dia
    ADD CONSTRAINT "FK_669350a09a2929d57eaaecc6f5f" FOREIGN KEY (dia_semana_id) REFERENCES public.dia_semana(id);
 W   ALTER TABLE ONLY public.cuidador_dia DROP CONSTRAINT "FK_669350a09a2929d57eaaecc6f5f";
       public          postgres    false    4198    226    228            p           2606    16645 %   resena FK_766f16b1a880eae96c7e230a339    FK CONSTRAINT     �   ALTER TABLE ONLY public.resena
    ADD CONSTRAINT "FK_766f16b1a880eae96c7e230a339" FOREIGN KEY ("cuidadorId") REFERENCES public.cuidador(id);
 Q   ALTER TABLE ONLY public.resena DROP CONSTRAINT "FK_766f16b1a880eae96c7e230a339";
       public          postgres    false    222    4194    224            u           2606    16799 +   cuidador_dia FK_9b11d6da7d65c8c09570d33f2be    FK CONSTRAINT     �   ALTER TABLE ONLY public.cuidador_dia
    ADD CONSTRAINT "FK_9b11d6da7d65c8c09570d33f2be" FOREIGN KEY (cuidador_id) REFERENCES public.cuidador(id) ON UPDATE CASCADE ON DELETE CASCADE;
 W   ALTER TABLE ONLY public.cuidador_dia DROP CONSTRAINT "FK_9b11d6da7d65c8c09570d33f2be";
       public          postgres    false    228    222    4194            r           2606    16789 1   cuidador_categoria FK_a2d73f5561b82f469a1e582b1ff    FK CONSTRAINT     �   ALTER TABLE ONLY public.cuidador_categoria
    ADD CONSTRAINT "FK_a2d73f5561b82f469a1e582b1ff" FOREIGN KEY (cuidador_id) REFERENCES public.cuidador(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.cuidador_categoria DROP CONSTRAINT "FK_a2d73f5561b82f469a1e582b1ff";
       public          postgres    false    4194    227    222            s           2606    16794 1   cuidador_categoria FK_b77dac79756b274a6a1030da590    FK CONSTRAINT     �   ALTER TABLE ONLY public.cuidador_categoria
    ADD CONSTRAINT "FK_b77dac79756b274a6a1030da590" FOREIGN KEY (categoria_id) REFERENCES public.categoria(id);
 ]   ALTER TABLE ONLY public.cuidador_categoria DROP CONSTRAINT "FK_b77dac79756b274a6a1030da590";
       public          postgres    false    220    4190    227            q           2606    16650 %   resena FK_bc1bb94c1f6fd9a8ffa94141f1a    FK CONSTRAINT     �   ALTER TABLE ONLY public.resena
    ADD CONSTRAINT "FK_bc1bb94c1f6fd9a8ffa94141f1a" FOREIGN KEY ("usuarioId") REFERENCES public.usuario(id);
 Q   ALTER TABLE ONLY public.resena DROP CONSTRAINT "FK_bc1bb94c1f6fd9a8ffa94141f1a";
       public          postgres    false    4186    218    224            
   N   x�3���KK�+���2�I-JN-JTpMIL�2�t�,NN,HL�,IL��2�t̩�H��M-�2��K��K,I������ ��         �	  x��X�rܸ]S_��n�C���Gv&��T�,R�@$�	p ����h�S��-,�^�-)��/T�L�qq^��Y;)~҅2V�j3���zLn�WV|�{�+9��N���Lf��r��R�����䮪J�ûw�,�� �Z�ښ�_Lj?Vb<��B>Z#?�Ij�wi�3�Y���R=�܏3i��g��v��M��}r��Ny&s!�Jb���,1C��2B�NdJ��n�8ҟei�Vh|�w4�ȥ;Y�\K?�5B%�z(��ʤ���S���n5��W���r�Ҫ���������7�~��v��O1y��t��9Y�4����TV����1fX�H앯�%�}�oЖ0w����T�޷x��,Q ���0;���Z��0L.��+<�LK���S�ٽD鱃���������C�^jT���o�z� =`�`�J��rE�JqFa�\���W<�!���򚧂�h�	Z�=��r��NK���Y�Q�BT[v�uE@k�0�d�\N��j�\/.��yr�\�i���ɍ�������d��a1���y�HޣJ�_�(>YT+yP����	��4��<�}߄�5P`��N�������9(��(�b&�Yt{|�E!���M��qI[O�<ԗ��O����Uo"�j�����Ɋ�����aQ#�1ǉ��͗�f�����H����:p�vo4�=�����4l����]-޺�3�w�-��X�n�����07�#Љy�?Z1<2V�L$��!��|�6�x�ue�-��V�t�K��H��@|G(��M��ǰ�Bu���,bx$|�z���<1��d��?\�m��f�>SF����h�4@W�3��S�6� ��X7��ma%=���8d[�7q��FUT�4!�a���,����f1�/^�pDq� OA�~^��kV8���)���	E'/�%D����-��xݷ�o���k �իDy��ĬL��p|�#q'�̈́޿��8���F޷Ф�f(��_�fv��. �x�g#���U�s��0z��>�;��~ʻ_�������k_���SacU�U�e)4f��=��Ӻ�*��~��):�$� q�d�^n��9\�v�W����?����#ꖄ���oʩ�$��Ae@+��,}����i�݊̃��Q�7���{�;�s��*��#�7�ކj��KYiG|~��ST'��g.�00u�KBC�F�4�*���֨��V�R���M�p	^EKl�a�޶ljEk !\����!�F$�(��6�����6MY����<�:bM�2
�ڴ�c��+ߴZ��\�qҵ�t���#�bri���⏌H�<�u��!�X�k��al�vgF�"Tpv�bO�ta}�Ӗs�\���d��lAI���8����̦L@���2��վ׹P��Z=����|%+�iH����߾I#�x��P���@?����ݍ�P?ȍ=���G[�'Nh�YWw��3|"]�ǐޜ�ީqi����L>F�G�9�>�q=���'��V{3@N�k��t) GR��%8ۂ6Jdx6�@�v�!@F�̐���k�;ѫKo���I�B<J%� =�'��z�Z���H%���J��^gځҶ}�$�����j�0�=�$c�pG�EM$����Tbu�C(1�F����������J��@�z�J�$e	�<$�P�u�R��κ����.�P�	V�J/\z�,<��׎
�?�łRJL�i�nM��D{h9�:�rSc������@Eu��I�L0�'�
����l����E�E{���t���&}�p���:�(?��ʁ�o�����w8�ʦ��r<�.V��z���0��cf�N�G($9$[ԭ�)�Y���q�-�dg��kY]�f[���H��r�eZ���L��ހ~N��>�T��5"K�6j@ا�ͣ]I����T�b=u�4�.W�Q(O�o������b	y���ؿ�y+�b�h���v����\�g-�����m���=�ʹ߷����	��/,����FB�ǳ�0���j��\�֛�?vѥ����W����\7O�mw7s-a��0]���I�8��/:�񄒽\�6�r�t�����NR���u������9&��Gl�(���,��\���� �%:��r{���^��?RxO?��B�tm�Q��	kx7��������]ml"����Z��������l�خ/�2���s��W���z�wJ����!����D��o�)����螾����f��b[��kk���ϽPZ�y�7tU���TE��«k7�i��i�+�v{1��l(zw=
�i����sz��Q(�P��T�݉�׷A�9ݪA@"��֝�".��	)y������/��7������^tXW&,�|��\n6������-�1�_�����G�<            x�3�4�2�4�2�4b�=... m�         D   x�ʹ 0���[����(`97�[�ҵ˒�<�Qr'�Ċ��k�����_l�G����         L   x�3��)�K-�2��M,*2�9}3�,J��rL8�JSˀSΰ��"�B3����S��9]�s3���b���� ya            x������ � �            x������ � �         �   x���An�0��5�e��=vW��DBc��P��ӗn8A�o�K�V_��j��S��wy��t��I�[��Su]ץ|��,�NO�mҏ�)�l����I^{�[��v+�QZd
^�GB2����<g&Z�ȉ�y��l	��Yҥ:�T}Vr���ؒ]r>y�ds #L Ae�d8��>f',�-��9�V*0w5&

H�&�~E�\I+��p8�p�� Fy��˹'������^`d�T�x@�M]�jN�o     