# == Schema Information
#
# Table name: items
#
#  id         :integer          not null, primary key
#  name       :string(255)      not null
#  quantity   :integer          not null
#  list_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class Item < ActiveRecord::Base
end
