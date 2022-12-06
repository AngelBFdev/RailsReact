class ProductsController < ApplicationController
  def index
    @products = Product.all
  end

  def show
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def find_product
    begin
      @product = Product.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      redirect_to root_path
    end

  end

  def product_params
    params.require(:product).permit(:name, :price, :description, :image_url)
  end
end
