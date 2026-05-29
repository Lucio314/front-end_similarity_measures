import MethodTBodyCell from './MethodTBodyCell';

interface MethodTBodyRowProps{
    methodRow: string;
    methodName: string;
    support: boolean;
    flexibilite: boolean;
    longueur: boolean;
    ontologie: boolean;
    vitesse: string;
}

function MethodTBodyRow({methodRow, methodName, support, flexibilite, longueur, ontologie, vitesse} : MethodTBodyRowProps){

    return (
        <tr className="tbody-method-row">
            <td className="tbody-method-cell">
                <div className="tbody-method-cell-upper-text">
                    {methodRow}
                </div>
                <div className="tbody-method-cell-lower-text">
                    {methodName}
                </div>
            </td>
            <MethodTBodyCell valide={support}/>
            <MethodTBodyCell valide={flexibilite}/>
            <MethodTBodyCell valide={longueur}/>
            <MethodTBodyCell valide={ontologie}/>
            <td className="tbody-method-cell">
                <span>{vitesse}</span>
            </td>
        </tr>
    )
}

export default MethodTBodyRow