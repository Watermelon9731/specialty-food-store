# Implementation Notes

## Mock Data Mode
Currently, the application is running in **Mock Data Mode** to allow for UI demonstration and review without a database connection.

### How it works
The repository files (`src/server/*/repo.ts`) have been modified to return static mock data instead of querying the database via Prisma.

### Files Modified
- `src/server/categories/repo.ts`: Returns mock categories.
- `src/server/products/repo.ts`: Returns mock products.

### How to switch to Real Database
When you are ready to connect to Supabase:
1. Uncomment the original database calls in the files listed above.
2. Remove the mock data blocks.
3. Ensure your `.env` file has the correct `DATABASE_URL` and `DIRECT_URL`.
4. Run `npx prisma db push` or `npx prisma migrate dev` to setup your database schema.
