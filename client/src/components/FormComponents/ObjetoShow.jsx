export default function ObjetoShow({ itemInfo }) {
    return (
        <div className="flex flex-col p-4 gap-4">
            <section className="flex gap-2">
                <p className="font-bold">Nombre: </p>
                <p>{itemInfo.nombre}</p>
            </section>
            <section className="flex gap-2">
                <p className="font-bold">Material: </p>
                <p>
                    {itemInfo.material.nombre +
                        " (poder calorífico: " +
                        itemInfo.material.poder_calorifico +
                        ")"}
                </p>
            </section>
        </div>
    );
}
