
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const notFound = () => {
  const error = new Error('Produto não encontrado');
  error.status = 404;
  return error;
};

const validateProduct = (data) => {
  if (
    typeof data?.name !== 'string' ||
    !data.name.trim() ||
    typeof data?.category !== 'string' ||
    !data.category.trim() ||
    typeof data?.price !== 'number' ||
    !Number.isFinite(data.price) ||
    data.price < 0
  ) {
    const error = new Error(
      'Informe nome, categoria e preço válido.'
    );
    error.status = 400;
    throw error;
  }
};

const getProductId = (id) => {
  const productId = Number(id);

  if (!Number.isSafeInteger(productId) || productId <= 0) {
    const error = new Error('ID do produto inválido');
    error.status = 400;
    throw error;
  }

  return productId;
};

export const productService = {
  async getAllProducts() {
    return prisma.product.findMany({
      orderBy: { id: 'asc' }
    });
  },

  async getProductById(id) {
    const product = await prisma.product.findUnique({
      where: { id: getProductId(id) }
    });

    if (!product) throw notFound();

    return product;
  },

  async createProduct(data) {
    validateProduct(data);

    return prisma.product.create({
      data: {
        name: data.name.trim(),
        price: data.price,
        category: data.category.trim()
      }
    });
  },

  async updateProduct(id, data) {
    const productId = getProductId(id);

    await this.getProductById(productId);

    validateProduct(data);

    return prisma.product.update({
      where: { id: productId },
      data: {
        name: data.name.trim(),
        price: data.price,
        category: data.category.trim()
      }
    });
  },

  async deleteProduct(id) {
    const productId = getProductId(id);

    await this.getProductById(productId);

    await prisma.product.delete({
      where: { id: productId }
    });

    return true;
  }
};
