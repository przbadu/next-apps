class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  has_person_name

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  # associations
  has_many :memberships, dependent: :destroy
  has_many :organizations, through: :memberships
end
