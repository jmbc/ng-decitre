export interface Book {
  title: string;
  authors: string[];  // Tableau pour matcher l'API
  publisher: string;
  pub_date: string;
  isbn: string;
  ean: string;  // ID pour détails et collection
  pages: string;
  format: string;
  price: string;
  description?: string;
  image?: string;
  link:string;
}