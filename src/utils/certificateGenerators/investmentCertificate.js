module.exports = ({
  fullName,
  amountPaid,
  amountDue,
  startDate,
  endDate,
  duration,
  interestRate,
}) => `<html>
  <head>
    <style>
    body {
      width: 750px;
      height: 563px;
    }
      .border {
        border: 10px solid #008ab4;
        padding: 20px 45px;
        color: #454647;
        font-size: 12px;
      }
      .center {
        text-align: center;
      }
      .logo {
        width: 200px;
      }

      h1 {
        margin: 10px
        color: #024364;
      }
      h2 {
        font-size: #024364;
        margin-bottom: 0px;
      }

      .sign {
        text-align: right;
      }
      strong {
        color: black;
      }

      .sign img {
        width: 100px;
      }
      .sign strong {
        font-size: 15px;
        color: #024364;
      }
      .content {
        width: 750px;
        height: 563px;
      }
    </style>
  </head>
  <body>
    <div class="content">
      <div class="border">
        <div class="center">
          <div class="center">
            <img
              class="logo"
              alt="logo"
              src="https://res.cloudinary.com/gracefrank/image/upload/v1624467989/abudanza_public/ABUDANZA_LOGO_1_fxnydk.png"
            />

            <h1>CERTIFICATE OF INVESTMENT</h1>
          </div>
          <h2><em>${fullName}</em></h2>
          <hr />
          <p>
            This confirms your payment with Abudanza as an investor. The sum of
            ${amountPaid} Naira was paid for investment Plan plan plan to get
            a ${interestRate}% ROI at the end of${duration} days with start date from <strong>${startDate}</strong> to
            <strong>${endDate}</strong> with total payable of   <strong>${amountDue} Naira</strong>
            (initial capital plus ROI)
          </p>
        </div>
        <div class="sign">
          <img
            alt="ceo signature"
            src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Jon_Kirsch%27s_Signature.png"
          />
          <p><strong>Samuel Jobs</strong></p>
          <p>CEO/Co-founder</p>
        </div>
      </div>
    </div>
  </body>
</html>
`;
