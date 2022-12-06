class User < ApplicationRecord
  before_save { self.email.downcase! }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i.freeze
  validates :first_name, :last_name, :email, presence: true
  validates :email,
    uniqueness: { case_sensitive: false },
    format: { with: VALID_EMAIL_REGEX}
  has_secure_password
end
