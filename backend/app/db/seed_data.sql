-- CUPOS DE PRUEBA
WITH RECURSIVE nums(i) AS (
  SELECT 1
  UNION ALL
  SELECT i+1 FROM nums WHERE i < 100
)
INSERT INTO cupos (piso, zona, estado)
SELECT p, 'A' || i, 'libre'
FROM (SELECT 1 AS p UNION SELECT 2 UNION SELECT 3), nums;

-- TARIFAS DE PRUEBA
INSERT INTO tarifas (tipoVehiculo, valorHora, valorFraccion, valorMaximo)
VALUES
('carro', 3000, 1000, 15000),
('moto', 1500, 500, 7000);
