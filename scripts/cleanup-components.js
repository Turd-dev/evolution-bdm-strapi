const { Client } = require('pg');

async function safeCleanupComponents() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();

    // First, let's check what component tables exist
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE 'components_%';
    `);

    console.log('Found component tables:', tables.rows.map(r => r.table_name));

    // Just clean up the author block components specifically
    if (tables.rows.find(r => r.table_name.includes('author_block'))) {
      await client.query(`
        UPDATE blog_posts 
        SET dragAndDrop = array_remove(dragAndDrop, 'blog.author-block')
        WHERE dragAndDrop @> ARRAY['blog.author-block']::varchar[];
      `).catch(e => console.log('No dragAndDrop column to update'));

      // Remove only the author block component data
      await client.query(`
        DELETE FROM components_blog_author_blocks;
      `).catch(e => console.log('No author blocks to delete'));
    }

    console.log('Safely cleaned up deleted component data');
    await client.end();
  } catch (err) {
    console.error('Error:', err);
    if (client) {
      await client.end();
    }
  }
}

safeCleanupComponents();