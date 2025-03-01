export interface Product {
  id: string;
  titulo: string;
  descripcion: string;
  color_vidrio: string;
  color_lente: string;
  material: string;
  categoria: string;
  forma: string;
  precio: number;
  tipo: string;
  imagen1: string;
  imagen2: string;
  imagen3: string;
  destacado: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}