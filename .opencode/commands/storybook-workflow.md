---
description: Ejecuta el flujo secuencial de auditoría, contratos, construcción y validación de Storybook.
agent: storybook-01-audit
---

Ejecuta este flujo sin solapar fases y conserva los handoffs entre ellas:

1. Invoca `storybook-01-audit` para auditar el proyecto y producir su handoff.
2. Con el resultado anterior, invoca `storybook-02-ui-contracts` para aplicar solo los contratos mínimos necesarios.
3. Con ambos handoffs, invoca `storybook-03-builder` para implementar o corregir Storybook.
4. Con todos los resultados, invoca `storybook-04-standards-validator` para validar el resultado sin editarlo.

No inicies una fase hasta que termine la anterior. Detente y reporta el bloqueo si una fase no puede continuar. Solicitud adicional del usuario: $ARGUMENTS
