# Stripe Invoice Exporter

A simple, efficient tool to bulk download Stripe invoices as PDF files.  
Built with TypeScript and Bun, this script allows you to easily export all your Stripe invoices from a specified date.

## 🌟 Features

- Bulk download Stripe invoices as PDF files
- Customizable date range for invoice retrieval
- Automatic creation of output directory
- Environment variable support for easy configuration
- Built with TypeScript for type safety
- Uses Bun for fast execution and file operations

## 🚀 Quick Start

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/stripe-invoice-exporter.git
   cd stripe-invoice-exporter
   ```

2. Create a `.env` file in the project root and add your Stripe secret key:
   ```
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   OUTPUT_DIRECTORY=./invoices
   ```

3. Run the script:
   ```
   bun run main.ts
   ```

## 🛠️ Configuration

You can configure the script by modifying the following variables in the `main.ts` file:

```typescript
const startDate = new Date('2024-10-03').getTime() / 1000; // Convert to Unix timestamp
const params: Stripe.InvoiceListParams = {
	limit: 100,
	created: { gte: startDate },
};
```

- `startDate`: Set this to the earliest date from which you want to download invoices.
- `limit`: Adjust this value to change the number of invoices processed in each batch (default is 100).

## 📁 Output

By default, invoices will be saved in the `./invoices` directory. You can change this by setting the `OUTPUT_DIRECTORY` environment variable in your `.env` file.

Each invoice will be saved as a PDF file with the naming format: `invoice_<invoice_number>.pdf`.

## 🔧 How It Works

1. The script first ensures that the output directory exists.
2. It then fetches invoices from Stripe, starting from the specified date.
3. For each invoice with a PDF available, it downloads the PDF and saves it to the output directory.
4. The process continues until all invoices have been downloaded.

## 🔒 Security Note

Never commit your `.env` file or expose your Stripe secret key. The `.gitignore` file is set up to exclude the `.env` file from version control.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/yourusername/stripe-invoice-exporter/issues).

## 📝 License

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.

## 🙏 Acknowledgements

- [Stripe](https://stripe.com) for their excellent API
- [Bun](https://bun.sh) for the fast runtime and file operations

---

Happy invoicing! If you find this tool useful, please give it a star ⭐️ on GitHub!