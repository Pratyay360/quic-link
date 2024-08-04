
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."sharedtext" (
    "id" "text" NOT NULL,
    "shared_text" "text"
);

ALTER TABLE ONLY "public"."sharedtext" REPLICA IDENTITY FULL;

ALTER TABLE "public"."sharedtext" OWNER TO "postgres";

COMMENT ON TABLE "public"."sharedtext" IS 'shared texts are stored here';

CREATE TABLE IF NOT EXISTS "public"."shorturls" (
    "id" "text" NOT NULL,
    "large_url" "text"
);

ALTER TABLE "public"."shorturls" OWNER TO "postgres";

COMMENT ON TABLE "public"."shorturls" IS 'here short urls are stored';

ALTER TABLE ONLY "public"."sharedtext"
    ADD CONSTRAINT "shared_text_id_key" UNIQUE ("id");

ALTER TABLE ONLY "public"."shorturls"
    ADD CONSTRAINT "shorturls_id_key" UNIQUE ("id");

ALTER TABLE ONLY "public"."shorturls"
    ADD CONSTRAINT "shorturls_pkey" PRIMARY KEY ("id");

CREATE POLICY "Enable delete for users based on user_id" ON "public"."sharedtext" FOR DELETE USING (true);

CREATE POLICY "Enable delete for users based on user_id" ON "public"."shorturls" FOR DELETE USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."sharedtext" FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."shorturls" FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "public"."sharedtext" FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON "public"."shorturls" FOR SELECT USING (true);

ALTER TABLE "public"."sharedtext" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."shorturls" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."sharedtext";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."shorturls";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."sharedtext" TO "anon";
GRANT ALL ON TABLE "public"."sharedtext" TO "authenticated";
GRANT ALL ON TABLE "public"."sharedtext" TO "service_role";

GRANT ALL ON TABLE "public"."shorturls" TO "anon";
GRANT ALL ON TABLE "public"."shorturls" TO "authenticated";
GRANT ALL ON TABLE "public"."shorturls" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
