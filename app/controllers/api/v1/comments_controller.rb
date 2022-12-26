class Api::V1::CommentsController < ApplicationController
  before_action :require_signin, only: [:create]
  before_action :set_product

  def index
    @comments = product.comments
  end

  def create
    @comment = @product.comments.build(comment_params)
    @comment.user = current_user
  end

  private

  def set_product
    @product = Product.where(id: params[:product_id]).first
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
