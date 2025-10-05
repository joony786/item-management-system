import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Item, ItemStatus } from '../modules/items/entities/item.entity';
import { getDatabaseConfig } from '../config/database.config';
import { ConfigService } from '@nestjs/config';

// Sample data for realistic generation
const categories = [
  'Electronics',
  'Clothing',
  'Books',
  'Home & Garden',
  'Sports & Outdoors',
  'Health & Beauty',
  'Toys & Games',
  'Automotive',
  'Food & Beverages',
  'Office Supplies',
  'Jewelry',
  'Furniture',
  'Pet Supplies',
  'Musical Instruments',
  'Art & Crafts',
  'Baby & Kids',
  'Travel & Luggage',
  'Tools & Hardware',
  'Garden & Outdoor',
  'Kitchen & Dining'
];

const statuses = Object.values(ItemStatus);

const sampleTags = [
  'new', 'sale', 'popular', 'trending', 'limited', 'premium', 'eco-friendly',
  'organic', 'handmade', 'vintage', 'modern', 'classic', 'luxury', 'budget',
  'gift', 'seasonal', 'exclusive', 'bestseller', 'award-winning', 'innovative'
];

function generateRandomItem(): Partial<Item> {
  const category = faker.helpers.arrayElement(categories);
  const status = faker.helpers.arrayElement(statuses);
  
  // Generate realistic titles based on category
  const title = generateTitleForCategory(category);
  
  // Generate realistic descriptions
  const description = generateDescriptionForCategory(category, title);
  
  // Generate realistic price based on category
  const price = generatePriceForCategory(category);
  
  // Generate quantity (0-1000, with some items having 0 stock)
  const quantity = faker.datatype.boolean(0.1) ? 0 : faker.number.int({ min: 1, max: 1000 });
  
  // Generate tags (1-5 tags per item)
  const tagCount = faker.number.int({ min: 1, max: 5 });
  const tags = faker.helpers.arrayElements(sampleTags, tagCount);
  
  return {
    title,
    description,
    category,
    price,
    quantity,
    tags,
    status,
  };
}

function generateTitleForCategory(category: string): string {
  const categoryTitles = {
    'Electronics': () => faker.helpers.arrayElement([
      `${faker.company.name()} ${faker.helpers.arrayElement(['Smartphone', 'Laptop', 'Tablet', 'Headphones', 'Speaker', 'Camera', 'Monitor', 'Keyboard', 'Mouse', 'Smart Watch'])}`,
      `${faker.color.human()} ${faker.helpers.arrayElement(['Gaming', 'Wireless', 'Bluetooth', 'Smart', 'Digital', 'Portable'])} ${faker.helpers.arrayElement(['Headphones', 'Speaker', 'Charger', 'Cable', 'Adapter'])}`,
      `${faker.helpers.arrayElement(['Professional', 'High-End', 'Budget', 'Gaming', 'Business'])} ${faker.helpers.arrayElement(['Laptop', 'Desktop', 'Monitor', 'Keyboard', 'Mouse'])}`
    ]),
    'Clothing': () => faker.helpers.arrayElement([
      `${faker.color.human()} ${faker.helpers.arrayElement(['Cotton', 'Wool', 'Silk', 'Denim', 'Leather'])} ${faker.helpers.arrayElement(['T-Shirt', 'Jeans', 'Dress', 'Jacket', 'Sweater', 'Shirt', 'Pants', 'Skirt', 'Blouse'])}`,
      `${faker.helpers.arrayElement(['Vintage', 'Modern', 'Classic', 'Trendy', 'Casual', 'Formal'])} ${faker.helpers.arrayElement(['Men\'s', 'Women\'s', 'Unisex'])} ${faker.helpers.arrayElement(['T-Shirt', 'Hoodie', 'Sweater', 'Jacket', 'Pants'])}`
    ]),
    'Books': () => faker.helpers.arrayElement([
      `"${faker.lorem.words(3)}" by ${faker.person.fullName()}`,
      `${faker.helpers.arrayElement(['The', 'A', 'An'])} ${faker.lorem.words(2)} ${faker.helpers.arrayElement(['Guide', 'Manual', 'Handbook', 'Tutorial', 'Reference'])}`,
      `${faker.helpers.arrayElement(['Complete', 'Advanced', 'Beginner\'s', 'Professional', 'Essential'])} ${faker.helpers.arrayElement(['Guide to', 'Introduction to', 'Handbook for'])} ${faker.lorem.word()}`
    ]),
    'Home & Garden': () => faker.helpers.arrayElement([
      `${faker.color.human()} ${faker.helpers.arrayElement(['Decorative', 'Functional', 'Modern', 'Vintage', 'Rustic'])} ${faker.helpers.arrayElement(['Vase', 'Lamp', 'Mirror', 'Painting', 'Sculpture', 'Plant Pot', 'Candle Holder'])}`,
      `${faker.helpers.arrayElement(['Indoor', 'Outdoor', 'Garden', 'Patio', 'Balcony'])} ${faker.helpers.arrayElement(['Furniture', 'Decor', 'Lighting', 'Plant', 'Accessory'])}`
    ]),
    'Sports & Outdoors': () => faker.helpers.arrayElement([
      `${faker.helpers.arrayElement(['Professional', 'Beginner', 'Advanced', 'Training', 'Competition'])} ${faker.helpers.arrayElement(['Running', 'Cycling', 'Swimming', 'Tennis', 'Basketball', 'Soccer', 'Golf'])} ${faker.helpers.arrayElement(['Shoes', 'Equipment', 'Gear', 'Accessories'])}`,
      `${faker.helpers.arrayElement(['Outdoor', 'Camping', 'Hiking', 'Fishing', 'Hunting'])} ${faker.helpers.arrayElement(['Gear', 'Equipment', 'Tools', 'Accessories', 'Supplies'])}`
    ])
  };
  
  const titleGenerator = categoryTitles[category] || (() => `${faker.commerce.productName()} - ${faker.commerce.productAdjective()}`);
  return titleGenerator();
}

function generateDescriptionForCategory(category: string, title: string): string {
  const baseDescription = faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 }));
  
  const categorySpecificDescriptions = {
    'Electronics': [
      'High-quality electronic device with advanced features and modern design.',
      'Latest technology with excellent performance and durability.',
      'Professional-grade equipment suitable for both personal and business use.'
    ],
    'Clothing': [
      'Comfortable and stylish clothing made from premium materials.',
      'Fashion-forward design that combines style with functionality.',
      'High-quality fabric with excellent fit and durability.'
    ],
    'Books': [
      'Comprehensive guide with detailed information and practical examples.',
      'Well-researched content with clear explanations and illustrations.',
      'Essential reading for anyone interested in this subject.'
    ],
    'Home & Garden': [
      'Beautiful decorative piece that enhances any living space.',
      'High-quality materials with elegant design and excellent craftsmanship.',
      'Perfect addition to your home decor with timeless appeal.'
    ],
    'Sports & Outdoors': [
      'Professional-grade equipment designed for optimal performance.',
      'Durable construction suitable for various outdoor activities.',
      'High-quality materials ensuring long-lasting use and reliability.'
    ]
  };
  
  const specificDesc = faker.helpers.arrayElement(categorySpecificDescriptions[category] || ['High-quality product with excellent features.']);
  
  return `${specificDesc} ${baseDescription}`;
}

function generatePriceForCategory(category: string): number {
  const priceRanges = {
    'Electronics': { min: 50, max: 2000 },
    'Clothing': { min: 20, max: 500 },
    'Books': { min: 10, max: 100 },
    'Home & Garden': { min: 30, max: 800 },
    'Sports & Outdoors': { min: 25, max: 600 },
    'Health & Beauty': { min: 15, max: 300 },
    'Toys & Games': { min: 10, max: 200 },
    'Automotive': { min: 50, max: 1000 },
    'Food & Beverages': { min: 5, max: 100 },
    'Office Supplies': { min: 5, max: 150 },
    'Jewelry': { min: 100, max: 5000 },
    'Furniture': { min: 100, max: 2000 },
    'Pet Supplies': { min: 10, max: 200 },
    'Musical Instruments': { min: 100, max: 3000 },
    'Art & Crafts': { min: 15, max: 300 },
    'Baby & Kids': { min: 20, max: 400 },
    'Travel & Luggage': { min: 50, max: 500 },
    'Tools & Hardware': { min: 25, max: 800 },
    'Garden & Outdoor': { min: 30, max: 600 },
    'Kitchen & Dining': { min: 20, max: 500 }
  };
  
  const range = priceRanges[category] || { min: 10, max: 500 };
  return parseFloat(faker.number.float({ min: range.min, max: range.max, fractionDigits: 2 }).toFixed(2));
}

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');
  
  // Create config service
  const configService = new ConfigService();
  
  // Create data source
  const dataSource = new DataSource(getDatabaseConfig(configService));
  
  try {
    // Initialize connection
    await dataSource.initialize();
    console.log('✅ Database connection established');
    
    // Get repository
    const itemRepository = dataSource.getRepository(Item);
    
    // Check if items already exist
    const existingCount = await itemRepository.count();
    if (existingCount > 0) {
      console.log(`⚠️  Database already contains ${existingCount} items`);
      const shouldContinue = process.argv.includes('--force');
      if (!shouldContinue) {
        console.log('Use --force flag to seed anyway');
        process.exit(0);
      }
      console.log('🔄 Clearing existing items...');
      await itemRepository.clear();
    }
    
    // Generate items
    const itemCount = 1000;
    console.log(`📦 Generating ${itemCount} items...`);
    
    const items: Partial<Item>[] = [];
    for (let i = 0; i < itemCount; i++) {
      items.push(generateRandomItem());
      
      // Log progress every 100 items
      if ((i + 1) % 100 === 0) {
        console.log(`📊 Generated ${i + 1}/${itemCount} items`);
      }
    }
    
    // Insert items in batches for better performance
    const batchSize = 100;
    console.log(`💾 Inserting items in batches of ${batchSize}...`);
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      await itemRepository.save(batch);
      console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(items.length / batchSize)}`);
    }
    
    // Verify insertion
    const finalCount = await itemRepository.count();
    console.log(`🎉 Successfully seeded ${finalCount} items!`);
    
    // Show some statistics
    const categoryStats = await itemRepository
      .createQueryBuilder('item')
      .select('item.category, COUNT(*) as count')
      .groupBy('item.category')
      .getRawMany();
    
    console.log('\n📊 Category distribution:');
    categoryStats.forEach(stat => {
      console.log(`  ${stat.category}: ${stat.count} items`);
    });
    
    const statusStats = await itemRepository
      .createQueryBuilder('item')
      .select('item.status, COUNT(*) as count')
      .groupBy('item.status')
      .getRawMany();
    
    console.log('\n📈 Status distribution:');
    statusStats.forEach(stat => {
      console.log(`  ${stat.status}: ${stat.count} items`);
    });
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    // Close connection
    await dataSource.destroy();
    console.log('🔌 Database connection closed');
  }
}

// Run the seeding
if (require.main === module) {
  seedDatabase();
}

export { seedDatabase };
