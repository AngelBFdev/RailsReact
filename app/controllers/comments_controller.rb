class CommentsController < ApplicationController
  def create
  end

  private

  def set_product
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
