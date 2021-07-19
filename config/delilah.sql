-- -----------------------------------------------------
-- Esquema delilah
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `delilah` DEFAULT CHARACTER SET utf8 ;
USE `delilah` ;

-- -----------------------------------------------------
-- Tabla `delilah`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`roles` (
  `idRol` INT NOT NULL AUTO_INCREMENT,
  `nombreRol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRol`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Se inserta el rol admin(SUPERUSUARIO) y cliente
-- -----------------------------------------------------
insert into roles(nombreRol) values ('admin'),('cliente');

-- -----------------------------------------------------
-- Tabla `delilah`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`usuarios` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombreUsuario` VARCHAR(45) NOT NULL,
  `nombreCompleto` VARCHAR(255) NULL,
  `correo` VARCHAR(255) NULL,
  `telefono` VARCHAR(15) NULL,
  `direccion` VARCHAR(255) NULL,
  `contrasena` VARCHAR(255) NOT NULL,
  `idRol` INT NOT NULL,
  PRIMARY KEY (`idUsuario`, `idRol`),
  UNIQUE INDEX `username_UNIQUE` (`nombreUsuario` ASC) VISIBLE,
  INDEX `fk_usuarios_roles1_idx` (`idRol` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_roles1`
    FOREIGN KEY (`idRol`)
    REFERENCES `delilah`.`roles` (`idRol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabla `delilah`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`productos` (
  `idProducto` INT NOT NULL AUTO_INCREMENT,
  `codigoProducto` VARCHAR(45) NOT NULL,
  `nombreProducto` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NULL,
  `precio` INT NOT NULL,
  PRIMARY KEY (`idProducto`),
  UNIQUE INDEX `codigoproducto_UNIQUE` (`codigoProducto` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabla `delilah`.`metodosPago`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`metodosPago` (
  `idMetodoPago` INT NOT NULL AUTO_INCREMENT,
  `nombreMetodo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idMetodoPago`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `delilah`.`estados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`estados` (
  `idEstado` INT NOT NULL AUTO_INCREMENT,
  `nombreEstado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idEstado`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabla `delilah`.`pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`pedidos` (
  `idPedido` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `idMetodoPago` INT NOT NULL,
  `idEstado` INT NOT NULL,
  `fechaPedido` TIMESTAMP DEFAULT now(),
  `valorTotal` INT NOT NULL,
  PRIMARY KEY (`idPedido`),
  INDEX `fk_Pedidos_usuarios_idx` (`idUsuario` ASC) VISIBLE,
  INDEX `fk_pedidos_metodosPago1_idx` (`idMetodoPago` ASC) VISIBLE,
  INDEX `fk_pedidos_estados1_idx` (`idEstado` ASC) VISIBLE,
  CONSTRAINT `fk_Pedidos_usuarios`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `delilah`.`usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedidos_metodosPago1`
    FOREIGN KEY (`idMetodoPago`)
    REFERENCES `delilah`.`metodosPago` (`idMetodoPago`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedidos_estados1`
    FOREIGN KEY (`idEstado`)
    REFERENCES `delilah`.`estados` (`idEstado`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabla `delilah`.`encargos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `delilah`.`encargos` (
  `idEncargo` INT NOT NULL AUTO_INCREMENT,
  `idPedido` INT NOT NULL,
  `idProducto` INT NOT NULL,
  `cantidad` INT NULL DEFAULT 1,
  PRIMARY KEY (`idEncargo`),
  INDEX `fk_pedidos_has_productos_productos1_idx` (`idProducto` ASC) VISIBLE,
  INDEX `fk_pedidos_has_productos_pedidos1_idx` (`idPedido` ASC) VISIBLE,
  CONSTRAINT `fk_pedidos_has_productos_pedidos1`
    FOREIGN KEY (`idPedido`)
    REFERENCES `delilah`.`pedidos` (`idPedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedidos_has_productos_productos1`
    FOREIGN KEY (`idProducto`)
    REFERENCES `delilah`.`productos` (`idProducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Se inserta estados de pedido y metodos de pago por 
--                    defecto
-- -----------------------------------------------------
insert into estados(nombreEstado) values('nuevo'),('confirmado'),('preparando'),('enviando'),('cancelado'),('entregado');
insert into metodosPago(nombreMetodo) values ('efectivo'),('tarjeta');