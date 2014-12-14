# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
List.find_or_create_by(title: "1st")
List.find_or_create_by(title: "2nd")
List.find_or_create_by(title: "3rd")
List.find_or_create_by(title: "4th")

Item.transaction do
  l1 = List.first
  l2 = List.second

  l1.items.create(name: "Apples", quantity: 2)
  l1.items.create(name: "Chips", quantity: 3)

  l2.items.create(name: "drinks", quantity: 5)
end
