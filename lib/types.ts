export interface Product {
  id: string;
  titulo: string;
  descripcion: string;
  color: string;
  material: string;
  categoria: string;
  precio: number;
  tipo: string;
  imagen1: string;
  imagen2: string;
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
