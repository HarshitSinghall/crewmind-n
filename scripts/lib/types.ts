export interface PageRecord {
  url: string;
  route: string;
  file: string;
  status: number;
  resolvedUrl: string;
  capturedAt: string;
  title: string;
  error?: string;
}
export interface AssetRecord {
  url: string;
  path: string;
  status: number;
  bytes: number;
  sha256?: string;
  error?: string;
}
export interface Manifest {
  origin: string;
  capturedAt: string;
  pages: PageRecord[];
  assets: AssetRecord[];
  redirects: Record<string, string>;
  sitemaps: string[];
}
