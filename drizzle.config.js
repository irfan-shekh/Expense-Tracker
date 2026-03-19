import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql", // This is the missing piece!
    schema: "./utils/schema.jsx", // Make sure this path points to your schema file
    dbCredentials: {
        url:NEXT_PUBLIC_DATABASE_URL,
    },
});