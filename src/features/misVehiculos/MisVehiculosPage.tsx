import { IconCar as Car, IconPlus as Plus, IconCrown as Crown, IconUsers as Users } from "@tabler/icons-react";
import { theme } from "@/styles/theme";
import { Modal, LoadingState } from "@/components/shared";
import { VehiculoView } from "@/features/conductores/components/VehiculoView";
import { VehiculoFormModal } from "@/features/conductores/components/VehiculoFormModal";
import { getTipoVehiculoStyle } from "@/features/conductores/lib/helpers";
import { CrearMiVehiculoModal } from "./components/CrearMiVehiculoModal";
import { useMisVehiculosPage } from "./hooks/useMisVehiculosPage";

const C = theme;

export function MisVehiculos() {
  const {
    isLoading, miConductor, misVehiculos, esPrincipal, crear,
    viewing, openView, closeView,
    editando, form, setForm, touched, markTouched, erroresEdicion, abrirEditar, cerrarEditar, guardarEdicion,
  } = useMisVehiculosPage();

  if (isLoading) return <LoadingState message="Cargando tus vehículos..." />;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div
        style={{
          borderRadius: 20,
          background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`,
          padding: "1.4rem 1.6rem",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1 style={{ fontSize: "clamp(1.4rem,3vw,1.9rem)", fontWeight: 900, lineHeight: 1, marginBottom: 4 }}>
            Mis Vehículos
          </h1>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.85)" }}>
            Registra y consulta los vehículos vinculados a tu cuenta.
          </p>
        </div>
        {miConductor && (
          <button
            type="button"
            onClick={crear.abrir}
            style={{
              display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 12,
              border: "none", background: "#fff", color: C.primaryDark, fontSize: 13, fontWeight: 800,
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            <Plus size={16} /> Registrar vehículo
          </button>
        )}
      </div>

      {!miConductor && (
        <div
          style={{
            padding: "2rem", borderRadius: 16, border: `1px dashed ${C.border}`, textAlign: "center",
            color: C.textLight, fontSize: 13,
          }}
        >
          Tu cuenta no tiene un perfil de conductor vinculado, así que todavía no puedes
          registrar vehículos.
        </div>
      )}

      {miConductor && misVehiculos.length === 0 && (
        <div
          style={{
            padding: "2.4rem 1.5rem", borderRadius: 16, border: `1px dashed ${C.border}`, textAlign: "center",
          }}
        >
          <Car size={28} color={C.textLight} style={{ marginBottom: 10 }} />
          <p style={{ fontSize: 13, color: C.textLight, marginBottom: 14 }}>
            Todavía no tienes ningún vehículo registrado.
          </p>
          <button
            type="button"
            onClick={crear.abrir}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 12,
              border: "none", background: C.primary, color: "#fff", fontSize: 13, fontWeight: 800,
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            <Plus size={16} /> Registrar mi primer vehículo
          </button>
        </div>
      )}

      {misVehiculos.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
          {misVehiculos.map((v) => {
            const tipoStyle = getTipoVehiculoStyle(v.tipo);
            const TipoIcon = tipoStyle.icon;
            const soyPrincipal = miConductor ? esPrincipal(v, miConductor.id) : false;
            return (
              <div
                key={v.id}
                style={{
                  border: `1px solid ${C.border}`, borderRadius: 16, padding: "1.1rem",
                  display: "flex", flexDirection: "column", gap: 10, background: "#fff",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 38, height: 38, borderRadius: 10, background: tipoStyle.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <TipoIcon size={18} color={tipoStyle.dot} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 900, color: C.text }}>{v.placa}</div>
                    <div style={{ fontSize: 11, color: C.textLight }}>{v.marca} {v.linea}</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  {soyPrincipal ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 800, color: tipoStyle.text, background: tipoStyle.bg, padding: "3px 9px", borderRadius: 999 }}>
                      <Crown size={11} /> Propietario
                    </span>
                  ) : (
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 800, color: C.textLight, background: C.surfaceSubtle, padding: "3px 9px", borderRadius: 999 }}>
                      <Users size={11} /> Copropietario
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                  <button
                    type="button"
                    onClick={() => openView(v)}
                    style={{
                      flex: 1, padding: "9px 12px", borderRadius: 10, border: `1px solid ${C.border}`,
                      background: "#fff", color: C.text, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    Ver detalle
                  </button>
                  <button
                    type="button"
                    onClick={() => abrirEditar(v)}
                    disabled={!soyPrincipal}
                    title={soyPrincipal ? undefined : "Solo el propietario principal puede editar"}
                    style={{
                      flex: 1, padding: "9px 12px", borderRadius: 10, border: "none",
                      background: soyPrincipal ? C.primary : C.textMuted, color: "#fff", fontSize: 12, fontWeight: 700,
                      cursor: soyPrincipal ? "pointer" : "not-allowed", fontFamily: "inherit", opacity: soyPrincipal ? 1 : 0.6,
                    }}
                  >
                    Editar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal open={crear.open} onClose={() => crear.setOpen(false)} maxWidth={480} title="Registrar mi vehículo">
        <CrearMiVehiculoModal hook={crear} />
      </Modal>

      <Modal open={!!viewing} onClose={closeView} maxWidth={450} title="Detalle del vehículo">
        {viewing && (
          <VehiculoView
            vehiculo={viewing}
            onClose={closeView}
            onEditarVehiculo={
              miConductor && esPrincipal(viewing, miConductor.id) ? () => abrirEditar(viewing) : undefined
            }
          />
        )}
      </Modal>

      <Modal open={!!editando} onClose={cerrarEditar} maxWidth={480} title="Editar vehículo">
        {editando && form && (
          <VehiculoFormModal
            form={form}
            errors={erroresEdicion}
            touched={touched}
            isValid={Object.values(erroresEdicion).every((v) => !v)}
            onChange={(patch) => setForm((f) => (f ? { ...f, ...patch } : f))}
            onMarkTouched={markTouched}
            onSubmit={guardarEdicion}
            onCancel={cerrarEditar}
          />
        )}
      </Modal>
    </div>
  );
}
