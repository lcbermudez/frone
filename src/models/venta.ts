export interface VentaI{
  id?: number;
  fechaVenta: string;
  subtotalVenta: number;
  impuestosVenta: number;
  descuentosVenta: number;
  totalVenta: number;
  clienteId: number;
}
