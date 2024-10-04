import { Stripe } from 'stripe';
import { write } from 'bun';
import { mkdir } from 'node:fs/promises';
import { join } from 'path';

// Load environment variables
import { config } from 'dotenv';
config();

// Configuration
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const OUTPUT_DIRECTORY = process.env.OUTPUT_DIRECTORY || './invoices';

if (!STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY is not set in the .env file');
  process.exit(1);
}

// Initialize Stripe client
const stripe = new Stripe(STRIPE_SECRET_KEY);

// Add this function to create the directory if it doesn't exist
async function ensureDirectoryExists(directory: string) {
  try {
    await mkdir(directory, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function downloadInvoices() {
  try {
    // Ensure the output directory exists
    await ensureDirectoryExists(OUTPUT_DIRECTORY);

    const startDate = new Date('2024-10-03').getTime() / 1000; // Convert to Unix timestamp

    const params: Stripe.InvoiceListParams = {
      limit: 100,
      created: { gte: startDate },
    };

    for await (const invoice of stripe.invoices.list(params)) {
      if (invoice.invoice_pdf) {
        const response = await fetch(invoice.invoice_pdf);
        const pdfBuffer = await response.arrayBuffer();
        const fileName = `invoice_${invoice.number}.pdf`;
        const filePath = join(OUTPUT_DIRECTORY, fileName);
        
        await write(filePath, pdfBuffer);
        console.log(`Downloaded: ${fileName}`);
      }
    }

    console.log('All invoices have been downloaded.');
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

// Run the script
downloadInvoices();