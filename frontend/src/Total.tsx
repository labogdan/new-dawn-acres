import Table from 'react-bootstrap/Table';


function SuccessModal(props: any) {

    const girlTotal = props.num * 50;
    const fee = props.krogerParticipateValue === false || props.krogerEnrolledValue === false ? 40 : 0;
    let total = girlTotal + fee;

    if (props.isAdultLeader) {
        total -= 40;
    }

    let pipaFee = 0;
    let pipas = 0;

    props.pipas.map((girl: any) => {
        if (girl.grade >= 7) {
            // pipaFee += 40;
            // pipas++;
        }

    })
    total += pipaFee;
    props.setTotalCost(total);

    return (
        <>
        <Table striped bordered hover>
            <tbody>
            <tr>
                <th>Estimated Troop VA9020 Cost</th>
                <th>Cost</th>
                <th>Amount</th>
            </tr>
            <tr>
                <td>Troop Dues</td>
                <td>$50 per girl</td>
                <td>{props.num}</td>
            </tr>

            {pipaFee > 0 && (
                <>
                    <tr>
                        <td>Pi/Pa Trip Fund</td>
                        <td>$ per Pioneer / Patriot</td>
                        <td>{pipas}</td>
                    </tr>
                </>
            )}

            { fee > 0 && (
                <tr>
                    <td>Fundraiser Opt-Out Fee</td>
                    <td>$40 per family</td>
                    <td>1</td>
                </tr>
            )}

            { props.isAdultLeader && (
                <tr className="highlight">
                    <td>Adult Leader Reimbursement (UL, AUL and key roles only)</td>
                    <td>-$40</td>
                    <td>1</td>
                </tr>
            )}

            <tr>
                <td><b>Total Due*</b></td>
                <td colSpan={2}><b>${total}</b></td>
            </tr>
            </tbody>
        </Table>
            <p style={{fontSize: '14px'}}><sup>*</sup> This is an estimate provided for your convenience. Please wait for the official invoice from the Treasurer.</p>
        </>
    );
}

export default SuccessModal;
