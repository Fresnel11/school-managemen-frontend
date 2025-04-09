import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import { verifyEmail, resendVerificationCode } from "../services/authServices";

export const EmailConfirmationForm = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [error, setError] = useState<string>("");
  const [resendStatus, setResendStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [resendCountdown, setResendCountdown] = useState<number>(30);
  const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false);
  const navigate = useNavigate();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email = localStorage.getItem("pendingEmail") || "email inconnu";

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Veuillez entrer un code à 6 chiffres.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await verifyEmail(email, code);
      if (response.message === "Compte vérifié avec succès") {
        setLoadingConfirm(true);
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Pause de 5 secondes
        localStorage.removeItem("pendingEmail");
        navigate("/login");
      } else {
        setError("Code incorrect. Veuillez réessayer.");
      }
    } catch (err) {
      setError(err.message || "Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setResendStatus("");
    setIsResending(true);
    try {
      const response = await resendVerificationCode(email);
      setResendStatus(response.message);
      setResendCountdown(30);
    } catch (err) {
      setError(err.message || "Impossible de renvoyer le code.");
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 flex flex-col items-center w-full max-w-md space-y-6">
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Confirmez votre email</h3>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Un code à 6 chiffres a été envoyé à{" "}
            <span className="font-semibold text-gray-800">{email}</span>. Veuillez entrer le code
            ci-dessous pour activer votre compte.
          </p>
        </div>

        <div className="flex space-x-2 sm:space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              maxLength={1}
              className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg font-semibold text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200"
            />
          ))}
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-2 bg-gray-100 border border-gray-200 rounded-lg w-full">
            <AlertCircle className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">{error}</span>
          </div>
        )}

        {resendStatus && (
          <div className="flex items-center space-x-2 p-2 bg-gray-100 border border-gray-200 rounded-lg w-full">
            <span className="text-sm text-gray-600">{resendStatus}</span>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || loadingConfirm}
          className="w-full sm:w-auto bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-900 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loadingConfirm ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Redirection...
            </>
          ) : isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Vérification...
            </>
          ) : (
            "Confirmer"
          )}
        </Button>

        <p className="text-sm text-gray-500">
          Vous n'avez pas reçu le code ?{" "}
          <button
            onClick={handleResend}
            disabled={resendCountdown > 0 || isResending}
            className="text-gray-800 font-semibold hover:underline disabled:cursor-not-allowed"
          >
            {isResending
              ? "Envoi en cours..."
              : resendCountdown > 0
              ? `Renvoyer dans ${resendCountdown}s`
              : "Renvoyer"}
          </button>
        </p>
      </div>
    </div>
  );
};
