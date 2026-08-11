export const verificarSesion = (req, res, next) => {
    if (!req.session.usuario) {
        return res.status(401).json({
            mensaje: "Debe iniciar sesión para acceder"
        });
    }
    next();
};

export const verificarRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.session.usuario) {
            return res.status(401).json({
                mensaje:"No hay sesión"
            });
        }
        const rolUsuario = req.session.usuario.rol.toLowerCase();
        const roles = rolesPermitidos.map(
            rol => rol.toLowerCase()
        );
        if (!roles.includes(rolUsuario)) {
            return res.status(403).json({
                mensaje:"No tiene permisos"
            });
        }
        next();
    };
};