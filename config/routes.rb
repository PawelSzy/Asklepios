Rails.application.routes.draw do
  get 'lekarz_sessions/Controler'

  get 'lekarz_sessions/new'

  get 'pacjent_sessions/Controler'

  get 'pacjent_sessions/new'

  get 'specjalizacjas/new'

  get 'pokojs/new'

  #get 'o_nas/O_Nas'
  get '/o_nas' => 'o_nas#O_Nas'
  get '/zarejestruj_sie' => 'pacjents#new'
  get '/nowy_lekarz' => 'lekarzs#new'
  get '/nowy_pokoj' => 'pokojs#new'
  get '/nowa_specjalizacja' => 'specjalizacjas#new'
  get '/nowa_wizyta' => 'badanie_lekarskies#new'  
  get '/zarejestruj_wizyte' => 'zarejestruj_wizyte#show'
  post '/zarejestruj_wizyte' => 'zarejestruj_wizyte#create'
  post '/zarejestruj_wizyte/create' => 'zarejestruj_wizyte#create'
  get'/zarejestruj_wizyte/lista_wizyt' => 'zarejestruj_wizyte#listaWizyt'
  post '/zarejestruj_wizyte/lista_wizyt' => 'zarejestruj_wizyte#listaWizyt'

  resources :pacjents
  resources :lekarzs
  resources :pokojs
  resources :specjalizacjas 
  resources :badanie_lekarskies 
  # resources :zarejestruj_wizyte  
  # resources :pacjent
  # resources :lekarz

  get    'zaloguj'   => 'pacjent_sessions#new'
  post   'zaloguj'   => 'pacjent_sessions#create'
  delete 'wyloguj'  => 'pacjent_sessions#destroy'

  get    'zaloguj_lekarz'   => 'lekarz_sessions#new'
  post   'zaloguj_lekarz'   => 'lekarz_sessions#create'
  delete 'wyloguj_lekarz'  => 'lekarz_sessions#destroy'

 root 'strony#home'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
