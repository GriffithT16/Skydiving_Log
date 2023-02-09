SECRET_KEY = 'a7i8d9skf23wdsDSFVdxf3439fdjkdijfdojodjkfl2453ersfww2ew'

DATABASES = {
    'default': {
        'ENGINE': 'mysql.connector.django',
        'NAME': 'skydivers',
        'HOST': 'localhost',
        'USER': 'root',
        'PASSWORD': 'Bowhunt1',
        'HOST': '127.0.0.1',
        'PORT': '3306',
        'OPTIONS': {
            'autocommit': True
        }
    }
}