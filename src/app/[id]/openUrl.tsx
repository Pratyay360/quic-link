"use client";
interface Props {
    url: string;
}
export default function openUrl(params: Props) {
    window.location.href = params.url;
    return null;

}