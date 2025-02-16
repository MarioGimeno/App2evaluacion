import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // Importamos el ConfigModule para que se puedan leer las variables de entorno.
    ConfigModule,
    // Configuramos TypeORM de forma asíncrona para usar las variables de entorno.
    TypeOrmModule.forRootAsync({
      // Se inyecta ConfigService para tener acceso a las variables definidas en el .env
      inject: [ConfigService],
      // La función de fábrica (useFactory) recibe ConfigService y retorna el objeto de configuración
      // para la conexión a la base de datos.
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Se define el tipo de base de datos
        host: configService.get<string>('config.postgres.host'),
        port: configService.get<number>('config.postgres.port'),
        username: configService.get<string>('config.postgres.user'),
        password: configService.get<string>('config.postgres.password'),
        database: configService.get<string>('config.postgres.dbName'),
        // Se habilita SSL, permitiendo certificados autofirmados (útil en algunos entornos de producción)
        ssl: { rejectUnauthorized: false },
        // Permite que TypeORM cargue automáticamente las entidades que se definan en la aplicación
        autoLoadEntities: true,
        // synchronize: true permite sincronizar la base de datos con las entidades (solo para desarrollo)
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
