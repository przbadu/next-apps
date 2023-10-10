# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  include RackSessionsFix
  respond_to :json

  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  def respond_with(current_user, _opts = {})
    render json: {
      status: {
        code: 200,
        message: 'Logged in successfully',
        data: { user: UserSerializer.new(current_user).serializable_hash[:data][:attributes] }
      }, status: :ok
    }
  end

  def respond_to_on_destroy
    current_user = find_user_with_auth_header

    if current_user
      render json: {
        status: 200,
        message: 'Logged out successfully.'
      }, status: :ok
    else
      render json: {
        status: 401,
        message: 'Active session not found.'
      }, status: :unauthorized
    end
  end

  def find_user_with_auth_header
    auth_header = request.headers['Authorization']
    return unless auth_header.present?

    secret_key = Rails.application.credentials.devise_jwt_secret_key!
    jwt_payload = JWT.decode(auth_header.split(' ').last, secret_key).first

    User.find(jwt_payload['sub'])
  end
end
