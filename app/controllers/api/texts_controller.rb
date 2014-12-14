class Api::TextsController < ApplicationController
  def send_text

    message = parseMessage(params[:items])

    if message
      account_sid = 'AC8680220f692a529cb6c5030ff29d4197'
      auth_token = 'c85e2025ae88ae396a88fe8eb7d8844f'

      @client = Twilio::REST::Client.new account_sid, auth_token


      @client.account.messages.create({
        :from => '+16503895971',
        to: "+1" + params[:phone],
        body: message,
      })

      render json: ["Success"]
    else
      render json: ["No Items"], status: 422
    end
  end



  private

  def parseMessage(items)
    if (items.nil?)
      return nil
    end
    string = "Please buy: \n"
    items.each do |item, quant|
      string += "#{quant}x #{item}, "
    end

    string;
  end
end
