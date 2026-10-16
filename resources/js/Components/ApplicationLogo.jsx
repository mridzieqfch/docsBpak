export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/assets/img/LOGO_IT_PLN.png"
            alt="Logo IT-PLN"
            className={`h-16 w-auto object-contain ${props.className || ''}`}
        />
    );
}
