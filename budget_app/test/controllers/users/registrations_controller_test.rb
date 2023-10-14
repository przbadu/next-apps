# frozen_string_literal: true

require 'test_helper'

module Users
  class RegistrationsControllerTest < ActionDispatch::IntegrationTest
    test '#register new user' do
      assert_difference 'User.count', 1 do
        post user_registration_path,
             params: user_params,
             as: :json
      end
    end

    private

    def user_params
      {
        "users": {
          "email": 'test@example.com',
          "password": '123456789',
          "name": 'John Doe'
        }
      }
    end
  end
end
