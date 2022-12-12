class Api::V1::ProductsController < ApplicationController
  def index
    @products = Product.all
  end

  def show
  end


  def create
  end


  def update
  end

  def destroy
  end

  private

  def require_owner
    unless @product.owned_by?(current_user)
    end
  end

  def find_product
    begin
      @product = Product.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      redirect_to root_path
    end

  end

  def product_params
    params.require(:product).permit(
      :name, :price, :description, :image_url, :quantity
    )
  end
end
