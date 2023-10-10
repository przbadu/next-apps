class Membership < ApplicationRecord
  # associations
  belongs_to :user
  belongs_to :organization
end
