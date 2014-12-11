# == Schema Information
#
# Table name: lists
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  created_at :datetime
#  updated_at :datetime
#

class List < ActiveRecord::Base
  validates :title, presence: true

  has_many :items
end
