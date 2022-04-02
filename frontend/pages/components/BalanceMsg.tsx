interface BalanceMsgProps {
    label: string
    amount: number
}

export const BalanceMsg = ({ label, amount }: BalanceMsgProps) => {
    return (
        <div>
            <div>{label}</div>
            <div>{amount}</div>
        </div>
    )
}